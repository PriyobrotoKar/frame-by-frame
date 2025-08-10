import { PartialType } from '@nestjs/mapped-types';
import { CreateLearningDto } from './create.learning';

export class UpdateLeaningDto extends PartialType(CreateLearningDto) {}
