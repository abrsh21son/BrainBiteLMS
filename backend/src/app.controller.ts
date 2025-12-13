import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // This route is at /api due to global prefix
  @Get()
  @ApiOperation({ summary: 'Get API information' })
  @ApiResponse({ status: 200, description: 'API information' })
  getHello() {
    return {
      message: this.appService.getHello(),
      version: '1.0.0',
      documentation: '/api/docs',
      health: '/api/health',
      endpoints: {
        courses: '/api/courses',
        swagger: '/api/docs',
      },
    };
  }
}
