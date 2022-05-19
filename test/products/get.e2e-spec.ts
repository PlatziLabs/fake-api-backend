import * as request from 'supertest';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './../../src/app.module';

describe('[GET] /products/', () => {
  let app: INestApplication;
  const endpoint = '/api/v1/products/';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
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
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 200 products', () => {
    return request(app.getHttpServer())
      .get(endpoint)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(200);
      });
  });

  test('should return 10 products using the pagination', () => {
    return request(app.getHttpServer())
      .get(`${endpoint}?offset=0&limit=10`)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(10);
      });
  });

  test('should return 400 when price_min is negative number', () => {
    return request(app.getHttpServer())
      .get(`${endpoint}?price_min=-10`)
      .expect(400);
  });
});
