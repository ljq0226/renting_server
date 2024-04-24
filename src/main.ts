import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.fillter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { logger } from './common/middleware/logger.middleware';
// 导入并配置 dotenv
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors();
  app.use(logger);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
}
bootstrap();
