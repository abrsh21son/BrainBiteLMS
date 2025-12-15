import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { CustomValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Use environment variable for frontend URL, fallback to localhost only in development
  const frontendUrl = process.env.FRONTEND_URL || 
    (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '');
  
  // Handle empty frontend URL in production - log warning but allow all origins as fallback
  const allowedOrigins = frontendUrl 
    ? (frontendUrl.includes(',') 
        ? frontendUrl.split(',').map(url => url.trim())
        : [frontendUrl])
    : [];
  
  if (!frontendUrl && process.env.NODE_ENV === 'production') {
    logger.warn('⚠️  FRONTEND_URL environment variable is not set in production! CORS may be restrictive.');
  }
  
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      // If no frontend URL is configured, allow all origins (fallback)
      if (allowedOrigins.length === 0) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      if (process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['Content-Type', 'Authorization'],
  });
  logger.log(`CORS enabled for origin(s): ${frontendUrl}`);

  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle('BrainBite API')
    .setDescription('AI-Powered Learning Management System API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/', (req: Request, res: Response) => {
    res.json({
      message: 'BrainBite API',
      version: '1.0.0',
      status: 'running',
      documentation: '/api/docs',
      health: '/api/health',
      endpoints: {
        api: '/api',
        courses: '/api/courses',
        swagger: '/api/docs',
      },
    });
  });
  
  httpAdapter.get('/favicon.ico', (req: Request, res: Response) => {
    res.status(204).send();
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  const baseUrl = process.env.RENDER_EXTERNAL_URL || 
                  process.env.RAILWAY_PUBLIC_DOMAIN || 
                  `http://localhost:${port}`;
  
  logger.log(`🚀 Application is running on: ${baseUrl}`);
  logger.log(`📚 API Root: ${baseUrl}/api`);
  logger.log(`📚 Swagger documentation: ${baseUrl}/api/docs`);
  logger.log(`📚 Health check: ${baseUrl}/api/health`);
}

bootstrap();
