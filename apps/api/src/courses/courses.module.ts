import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { StorageModule } from '@/storage/storage.module';
import { QueueModule } from '@/queue/queue.module';

@Module({
  imports: [StorageModule, QueueModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
