import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentDto } from './create.document';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
  @IsString()
  @IsOptional()
  content?: string;
}
