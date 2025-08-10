import { NotificationType } from '@frame-by-frame/db';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(NotificationType)
  type: NotificationType;
}
