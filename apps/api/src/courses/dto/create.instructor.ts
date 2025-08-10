import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInstructorDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
