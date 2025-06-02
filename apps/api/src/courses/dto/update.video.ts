import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create.video';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;
}
