import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentDto } from './create.document';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  content?: string;
}
