import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @Min(0)
  duration: number;
}
