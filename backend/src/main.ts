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

  // Global prefix - all routes will be prefixed with /api
  app.setGlobalPrefix('api');

  // CORS configuration
  const frontendUrl = process.env.FRONTEND_URL || 'https://brain-bite-lms.vercel.app';
  // Allow multiple origins (comma-separated) or single origin
  const allowedOrigins = frontendUrl.includes(',') 
    ? frontendUrl.split(',').map(url => url.trim())
    : [frontendUrl];
  
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, or curl requests)
      if (!origin) {
        return callback(null, true);
      }
      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      // For development, allow all origins; restrict in production
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

  // Global validation pipe
  app.useGlobalPipes(new CustomValidationPipe());

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());

  // Swagger/OpenAPI documentation
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

  // Handle root route and favicon using Express directly
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
  
  // Handle favicon requests
  httpAdapter.get('/favicon.ico', (req: Request, res: Response) => {
    res.status(204).send();
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  // Get the actual URL (Render provides RENDER_EXTERNAL_URL)
  const baseUrl = process.env.RENDER_EXTERNAL_URL || 
                  process.env.RAILWAY_PUBLIC_DOMAIN || 
                  `http://localhost:${port}`;
  
  logger.log(`🚀 Application is running on: ${baseUrl}`);
  logger.log(`📚 API Root: ${baseUrl}/api`);
  logger.log(`📚 Swagger documentation: ${baseUrl}/api/docs`);
  logger.log(`📚 Health check: ${baseUrl}/api/health`);
}

bootstrap();
