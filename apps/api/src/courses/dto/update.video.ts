import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create.video';
import { IsOptional, IsString } from 'class-validator';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsString()
  @IsOptional()
  description?: string;
}
