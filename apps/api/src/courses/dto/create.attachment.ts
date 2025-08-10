import { AttachmentType } from '@frame-by-frame/db';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateAttachmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsEnum(AttachmentType)
  type: AttachmentType;

  @IsNumber()
  @Min(0)
  size: number;
}
