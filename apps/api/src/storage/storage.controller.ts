import { Body, Controller, Post } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  async generateUploadUrl(
    @Body() { directory, fileType }: { directory: string; fileType: string },
  ) {
    return this.storageService.generateUploadUrl(directory, fileType);
  }
}
