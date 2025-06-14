import {
  ECSClient,
  RunTaskCommand,
  RunTaskCommandInput,
} from '@aws-sdk/client-ecs';
import { SQSHandler } from 'aws-lambda';

const ecs = new ECSClient({
  region: process.env.REGION,
});

export const handler: SQSHandler = async (event) => {
  for (const sqsRecord of event.Records) {
    const s3Event = JSON.parse(sqsRecord.body);

    for (const s3Record of s3Event.Records) {
      console.log('Processing file upload', {
        bucket: s3Record.s3.bucket.name,
        key: s3Record.s3.object.key,
      });

      const key = s3Record.s3.object.key;
      const temp_bucket = s3Record.s3.bucket.name;

      try {
        const task: RunTaskCommandInput = {
          cluster: process.env.ECS_CLUSTER,
          taskDefinition: process.env.ECS_TASK_DEFINITION,
          launchType: 'FARGATE',
          networkConfiguration: {
            awsvpcConfiguration: {
              subnets: process.env.SUBNETS?.split(','),
              assignPublicIp: 'ENABLED',
            },
          },
          overrides: {
            containerOverrides: [
              {
                name: process.env.ECS_CONTAINER_NAME,
                environment: [
                  {
                    name: 'INPUT_VIDEO',
                    value: key,
                  },
                  {
                    name: 'BUCKET_TEMP',
                    value: temp_bucket,
                  },
                  {
                    name: 'BUCKET',
                    value: process.env.BUCKET,
                  },
                  {
                    name: 'BACKEND_URL',
                    value: process.env.BACKEND_URL,
                  },
                  {
                    name: 'API_KEY',
                    value: process.env.API_KEY,
                  },
                ],
              },
            ],
          },
        };

        const command = new RunTaskCommand(task);

        await ecs.send(command);
        console.log('Task submitted to ECS', task);

        await updateJobStatus(key.split('.')[0]); // videoId is the key
      } catch (error) {
        console.error('Error submitting ECS task', error);
      }
    }
  }
};

const updateJobStatus = async (videoId: string) => {
  if (!process.env.BACKEND_URL || !process.env.API_KEY) {
    console.error('Missing BACKEND_URL or API_KEY environment variables');
    throw new Error('Configuration error: BACKEND_URL or API_KEY is not set');
  }

  const baseUrl = process.env.BACKEND_URL;
  // :slug/chapters/:chapterSlug/lessons/videos/:videoSlug/status
  try {
    const response = await fetch(
      `${baseUrl}/api/courses/lessons/video/${videoId}/status?status=PROCESSING`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Error updating job status: ${response.statusText}`);
    }

    await response.json();
    console.log('Job status updated successfully');
  } catch (error) {
    console.error('Error updating job status');
    throw error;
  }
};
