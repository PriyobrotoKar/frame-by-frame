import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { QueryTransformPipe } from './common/pipes/query.transform.pipe';

export function configureApp(app: INestApplication) {
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
    new QueryTransformPipe(),
  );
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  return app;
}

async function bootstrap() {
  const app = configureApp(
    await NestFactory.create(AppModule, {
      rawBody: true,
    }),
  );
  await app.listen(8000);
}
bootstrap();
