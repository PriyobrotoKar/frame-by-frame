import { SQSHandler } from 'aws-lambda';
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectsCommand,
  ListObjectsCommand,
  ListObjectsCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';

const s3 = new S3Client();

const r2 = new S3Client({
  endpoint: process.env.R2_ENDPOINT,
  region: 'apac',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const deleteFile = async (key: string, bucket: string, client: S3Client) => {
  try {
    const params: DeleteObjectCommandInput = {
      Bucket: bucket,
      Key: key,
    };

    const deleteCommand = new DeleteObjectCommand(params);
    await client.send(deleteCommand);
  } catch (error) {
    console.error(`Failed to delete file ${key} from bucket ${bucket}:`, error);
    throw error;
  }
};

const deleteFolder = async (
  prefix: string,
  bucket: string,
  client: S3Client,
) => {
  async function recursiveDelete(marker?: string) {
    try {
      const params: ListObjectsCommandInput = {
        Bucket: bucket,
        Prefix: prefix,
        Marker: marker,
      };

      const listCommand = new ListObjectsCommand(params);
      const list = await client.send(listCommand);

      if (list.MaxKeys) {
        const deleteCommand = new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: {
            Objects: list.Contents?.map((item) => ({ Key: item.Key })),
            Quiet: false,
          },
        });

        const deleted = await client.send(deleteCommand);

        if (deleted.Errors) {
          throw new Error();
        }

        if (list.NextMarker) {
          await recursiveDelete(list.NextMarker);
        }
      }
    } catch (error) {
      console.error(
        `Failed to delete folder ${prefix} from bucket ${bucket}:`,
        error,
      );
    }
  }

  await recursiveDelete();
};

export const handler: SQSHandler = async (event) => {
  for (const sqsRecord of event.Records) {
    const body = JSON.parse(sqsRecord.body);
    const { key, bucket, prefix } = body;

    if (!bucket) {
      console.error('Bucket name is required');
      continue;
    }

    const isPublic = key.includes('trailer');
    const client = isPublic ? s3 : r2;

    if (key) {
      console.log(`Deleting file: ${key} from bucket: ${bucket}`);
      await deleteFile(key, bucket, client);
      console.log(`File ${key} deleted successfully from bucket ${bucket}`);
    } else if (prefix) {
      console.log(`Deleting folder: ${prefix} from bucket: ${bucket}`);
      await deleteFolder(prefix, bucket, client);
      console.log(
        `Folder ${prefix} deleted successfully from bucket ${bucket}`,
      );
    } else {
      console.error('No key or prefix provided for deletion');
    }
  }
};
