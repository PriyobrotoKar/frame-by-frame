import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageService {
  private readonly s3: S3;
  private readonly bucketName = process.env.AWS_BUCKET;
  private readonly tempBucketName = process.env.AWS_TEMP_BUCKET;

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

  async initializeMultiPartUpload(
    contentType: string,
    key: string,
  ): Promise<{ UploadId: string; Key: string }> {
    const params = {
      Bucket: this.tempBucketName,
      Key: key,
      ContentType: contentType,
    };

    const command = new CreateMultipartUploadCommand(params);
    const { UploadId } = await this.s3.send(command);

    return {
      UploadId,
      Key: key,
    };
  }

  async getMultipartSignedUrls(
    fileKey: string,
    uploadId: string,
    parts: number,
  ): Promise<{ url: string; partNumber: number }[]> {
    const signedUrlParams = {
      Bucket: this.tempBucketName,
      Key: fileKey,
      UploadId: uploadId,
    };

    const promises: Promise<string>[] = [];

    for (let i = 0; i < parts; i++) {
      const command = new UploadPartCommand({
        ...signedUrlParams,
        PartNumber: i + 1,
      });

      promises.push(getSignedUrl(this.s3, command));
    }

    const signedUrls = await Promise.all(promises);

    const signedUrlList = signedUrls.map((url, index) => ({
      url,
      partNumber: index + 1,
    }));

    return signedUrlList;
  }

  async completeMultipartUpload(
    fileKey: string,
    uploadId: string,
    parts: { PartNumber: number; ETag: string }[],
  ) {
    parts.sort((a, b) => a.PartNumber - b.PartNumber);

    const params = {
      Bucket: this.tempBucketName,
      Key: fileKey,
      UploadId: uploadId,
      MultipartUpload: {
        Parts: parts,
      },
    };

    const command = new CompleteMultipartUploadCommand(params);
    await this.s3.send(command);

    return {
      message: 'Multipart upload completed successfully',
    };
  }
}
