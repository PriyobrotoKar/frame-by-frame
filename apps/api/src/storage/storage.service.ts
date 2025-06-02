import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  private readonly s3: S3;
  private readonly bucketName = process.env.AWS_BUCKET;

  constructor() {
    this.s3 = new S3();
  }

  async generateUploadUrl(directory: string, fileType: string) {
    if (!fileType) {
      throw new Error('File type is required');
    }

    if (!directory) {
      throw new Error('Directory is required');
    }

    const key = `uploads/${directory}/${Date.now()}.${fileType}`;

    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: key,
    };

    const command = new PutObjectCommand(params);

    const url = await getSignedUrl(this.s3, command, {
      expiresIn: 300,
    });

    return {
      url,
      key,
    };
  }
}
