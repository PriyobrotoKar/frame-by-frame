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

  @Post('initialize-multipart-upload')
  async initializeMultiPartUpload(
    @Body() { contentType, key }: { contentType: string; key: string },
  ) {
    return this.storageService.initializeMultiPartUpload(contentType, key);
  }

  @Post('get-multipart-signed-urls')
  async getMultipartSignedUrls(
    @Body()
    {
      fileKey,
      uploadId,
      parts,
    }: {
      fileKey: string;
      uploadId: string;
      parts: number;
    },
  ) {
    return this.storageService.getMultipartSignedUrls(fileKey, uploadId, parts);
  }

  @Post('complete-multipart-upload')
  async completeMultipartUpload(
    @Body()
    {
      fileKey,
      uploadId,
      parts,
    }: {
      fileKey: string;
      uploadId: string;
      parts: { PartNumber: number; ETag: string }[];
    },
  ) {
    return this.storageService.completeMultipartUpload(
      fileKey,
      uploadId,
      parts,
    );
  }
}
