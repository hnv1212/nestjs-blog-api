import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global prefix
  app.setGlobalPrefix('api/v1')

  // handle all user input validation globally
  // app.useGlobalPipes(new ValidateInputPipe())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(3000);
}
bootstrap();