import { BatchJob, QueueJobType, SingleJob } from '@/types/queue.job';
import {
  SendMessageBatchCommand,
  SendMessageBatchCommandInput,
  SendMessageCommand,
  SendMessageCommandInput,
  SQSClient,
} from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QueueService {
  readonly client: SQSClient;
  readonly logger: Logger;
  readonly queues: Record<QueueJobType, string>;

  constructor(private configService: ConfigService) {
    this.client = new SQSClient({
      region: 'ap-south-1',
    });
    this.logger = new Logger(QueueService.name);

    this.queues = {
      DELETE_FILE: this.configService.get<string>('QUEUE_DELETE_FILE'),
    };
  }

  async addToQueue(job: SingleJob) {
    const params: SendMessageCommandInput = {
      QueueUrl: this.queues[job.type],
      MessageBody: JSON.stringify(job.body),
    };

    const command = new SendMessageCommand(params);
    const data = await this.client.send(command);

    this.logger.log(
      `Added job to queue: ${job.type} with ID: ${data.MessageId}`,
    );

    return data.MessageId;
  }

  async addBatchToQueue(jobs: BatchJob) {
    console.log(this.queues[jobs.type]);
    const params: SendMessageBatchCommandInput = {
      QueueUrl: this.queues[jobs.type],
      Entries: jobs.body.map((job) => {
        return {
          Id: job.id,
          MessageBody: JSON.stringify(job.payload),
        };
      }),
    };

    const command = new SendMessageBatchCommand(params);
    const data = await this.client.send(command);

    this.logger.log(
      `Added batch job to queue: ${jobs.type} with IDs: ${data.Successful.map(
        (msg) => msg.MessageId,
      )}`,
    );

    return data.Successful.map((msg) => msg.MessageId);
  }
}
