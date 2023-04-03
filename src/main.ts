import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  const config = app.get(ConfigService);
  app.enableCors();
  app.use(helmet());
  await app.listen(config.env.PORT);
}
bootstrap();
