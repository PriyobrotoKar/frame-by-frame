import { Context, APIGatewayProxyEvent, Handler, Callback } from 'aws-lambda';
import serverlessExpress from '@codegenie/serverless-express';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './main';

let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const app = configureApp(
      await NestFactory.create(AppModule, new ExpressAdapter(expressApp)),
    );

    await app.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
) => {
  const server = await bootstrap();

  return server(event, context, callback);
};
