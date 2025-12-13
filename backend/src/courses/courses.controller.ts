import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import type { User } from '@supabase/supabase-js';
import { CoursesService } from './courses.service';
import { GenerateCourseDto } from './dto/generate-course.dto';
import { CreateCourseResponseDto } from './dto/create-course-response.dto';
import { CourseResponseDto } from './dto/course-response.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published courses' })
  @ApiResponse({
    status: 200,
    description: 'List of published courses',
    type: [CreateCourseResponseDto],
  })
  async findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID with details' })
  @ApiParam({ name: 'id', description: 'Course UUID' })
  @ApiResponse({
    status: 200,
    description: 'Course details including pages and questions',
    type: CourseResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Course not found' })
  async findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post('generate')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate a new course using AI' })
  @ApiResponse({
    status: 201,
    description: 'Course generated successfully',
    type: CreateCourseResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async generate(
    @Body() dto: GenerateCourseDto,
    @CurrentUser() user: User,
  ) {
    return this.coursesService.generate(dto, user);
  }

  @Post('ask-question')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ask AI a question about lesson content' })
  @ApiResponse({ status: 200, description: 'AI response to question' })
  async askQuestion(
    @Body() body: { lessonContent: string; question: string },
  ) {
    return this.coursesService.askQuestionAboutLesson(body.lessonContent, body.question);
  }

  @Post('generate-summary')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate lesson summary' })
  @ApiQuery({ name: 'type', enum: ['paragraph', 'sentence', 'bullets'], required: false })
  @ApiResponse({ status: 200, description: 'Generated summary' })
  async generateSummary(
    @Body() body: { lessonContent: string },
    @Query('type') type: 'paragraph' | 'sentence' | 'bullets' = 'paragraph',
  ) {
    return this.coursesService.generateLessonSummary(body.lessonContent, type);
  }

  @Post('explain-answer')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get AI explanation for quiz answer' })
  @ApiResponse({ status: 200, description: 'AI explanation' })
  async explainAnswer(
    @Body() body: { question: string; correctAnswer: string; userAnswer: string; isCorrect: boolean },
  ) {
    return this.coursesService.explainAnswer(body.question, body.correctAnswer, body.userAnswer, body.isCorrect);
  }

  @Get(':id/recommendations')
  @ApiOperation({ summary: 'Get course recommendations' })
  @ApiResponse({ status: 200, description: 'Recommended course subjects' })
  async getRecommendations(@Param('id') id: string) {
    return this.coursesService.getCourseRecommendations(id);
  }
}
