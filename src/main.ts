import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TypeORMExceptionFilter } from '@utils/filters/typeorm.filter';
import { SeedService } from '@services/seed.service';
import helmet from 'helmet';

import { AppModule } from './app.module';

const devContentSecurityPolicy = {
  directives: {
    scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
    imgSrc: ["'self'", 'data:', 'https://cdn.jsdelivr.net'],
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      contentSecurityPolicy: devContentSecurityPolicy,
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new TypeORMExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Platzi Fake Store API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  const seedService = app.get(SeedService);
  await seedService.init();

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
