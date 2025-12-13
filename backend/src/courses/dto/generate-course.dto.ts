import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class GenerateCourseDto {
  @IsNotEmpty({ message: 'Subject is required' })
  @IsString({ message: 'Subject must be a string' })
  @MinLength(3, { message: 'Subject must be at least 3 characters long' })
  @MaxLength(100, { message: 'Subject must not exceed 100 characters' })
  subject: string;

  @IsOptional()
  @IsString({ message: 'Level must be a string' })
  @MaxLength(50, { message: 'Level must not exceed 50 characters' })
  level?: string;

  @IsOptional()
  @IsString({ message: 'Age range must be a string' })
  @MaxLength(50, { message: 'Age range must not exceed 50 characters' })
  ageRange?: string;

  @IsOptional()
  @IsString({ message: 'Language must be a string' })
  @MaxLength(50, { message: 'Language must not exceed 50 characters' })
  language?: string;
}
