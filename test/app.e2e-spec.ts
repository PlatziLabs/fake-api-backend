import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) 404', () => {
    return request(app.getHttpServer())
      .get('/')
      .send()
      .expect(404)
  });
  it('/api/categories (GET) 200', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .get('/categories')
      .send()
      .expect(200);

    expect(JSON.parse(response.text)).toStrictEqual([
      { id: 1, name: 'Clothes', typeImg: 'people' },
      { id: 2, name: 'Electronics', typeImg: 'tech' },
      { id: 3, name: 'Furniture', typeImg: 'arch' },
      { id: 4, name: 'Toys', typeImg: 'any' },
      { id: 5, name: 'Others', typeImg: 'animals' },
    ]);
  });
  it('/api/categories (POST) 201', async (): Promise<void> => {
    const response = await request(app.getHttpServer())
      .post('/categories')
      .send({ name: 'hello world', typeImg: 'TheWorld' })
      .expect(201);

    expect(JSON.parse(response.text)).toStrictEqual({
      id: 6,
      name: 'hello world',
      typeImg: 'TheWorld',
    });
  });
  // it('/api/categories (POST) 400', async (): Promise<void> => {
  //   const response = await request(app.getHttpServer())
  //     .post('/categories')
  //     .send({ name: '', typeImage: '' })
  //     .expect(400);
  //   expect(response).toBeUndefined();
  // });
});
