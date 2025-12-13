import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CoursesRepository } from './repositories/courses.repository';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository],
  exports: [CoursesService],
})
export class CoursesModule {}
