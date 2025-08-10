import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  GetObjectCommand,
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
  private readonly r2: S3;
  private readonly privateBucket = process.env.R2_BUCKET;
  private readonly publicBucket = process.env.AWS_BUCKET;
  private readonly tempBucketName = process.env.AWS_TEMP_BUCKET;

  constructor() {
    this.s3 = new S3({
      region: 'ap-south-1',
    });
    this.r2 = new S3({
      endpoint: process.env.R2_ENDPOINT,
      region: 'apac',
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });
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
      Bucket: this.publicBucket,
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

  async getSignedUrl(
    key: string,
    expiresIn: number = 3600, // Default to 1 hour
  ) {
    const params = {
      Bucket: this.privateBucket,
      Key: key,
    };

    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(this.r2, command, {
      expiresIn,
    });

    return {
      url,
      key,
    };
  }

  async getObject(key: string, type: 'private' | 'public' = 'public') {
    const params = {
      Bucket: type === 'private' ? this.privateBucket : this.publicBucket,
      Key: key,
    };

    const command = new GetObjectCommand(params);
    const object =
      type === 'private'
        ? await this.r2.send(command)
        : await this.s3.send(command);

    return object;
  }
}
