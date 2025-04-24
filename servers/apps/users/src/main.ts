import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
