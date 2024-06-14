import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setup security
  app.use(helmet());

  // set api prefix
  app.setGlobalPrefix('api');
  
  // enable validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  // configure swagger
  const config = new DocumentBuilder()
    .setTitle('Cashir App API')
    .setDescription('this API for cashir project contains all accounting functioalty and data storage')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // start app
  await app.listen(3000);
}
bootstrap();
