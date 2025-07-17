import { NestFactory } from '@nestjs/core';
import { SurveyActModule } from './surveyact.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SurveyActModule);

  app.enableCors({
    origin: '*', // Allow all origins, adjust as needed
    credentials: true, // Enable cookies and credentials if needed
  });

  await app.listen(process.env.PORT ?? 4002);
}
bootstrap();
