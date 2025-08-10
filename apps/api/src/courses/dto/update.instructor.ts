import { PartialType } from '@nestjs/mapped-types';
import { CreateInstructorDto } from './create.instructor';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateInstructorDto extends PartialType(CreateInstructorDto) {
  @IsString()
  @IsOptional()
  specialization?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  experienceYears?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  followers?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  revenue?: number;

  @IsString()
  @IsOptional()
  profilePic?: string;
}
