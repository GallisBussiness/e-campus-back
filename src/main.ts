import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exection-filter';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  app.use(helmet());
  app.enableCors({
    origin: '*',
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe,Authorization',
    methods: 'GET,PUT,POST,DELETE,PATCH,UPDATE,OPTIONS',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: process.env.NODE_ENV == 'production',
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = app.get(ConfigService);

  const port = config.get('NEST_PORT');
  await app.listen(port, () => logger.log(`App started at port: ${port}`));
}
bootstrap();
