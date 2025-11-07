import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;
  // Read allowed origins from environment variable
  const origins = process.env.CLIENT_ORIGINS
    ? process.env.CLIENT_ORIGINS.split(',').map((origin) => origin.trim())
    : ['http://localhost:3001', 'http://localhost:3002'];
  app.enableCors({
    origin: origins,
    credentials: true,
  });
  await app.listen(port, host);
}

void bootstrap();