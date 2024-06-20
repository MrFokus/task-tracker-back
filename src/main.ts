import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './api/auth/auth.guard';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors:true});
  app.useGlobalPipes(new ValidationPipe());
  console.log(__dirname)
  app.useStaticAssets(join(__dirname,'../'))
  app.setViewEngine('hbs');
  await app.listen(8000,'0.0.0.0');
}
bootstrap();
