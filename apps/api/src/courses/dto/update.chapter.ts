import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateChapterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  order?: number;
}
