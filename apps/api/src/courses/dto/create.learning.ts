import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLearningDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
