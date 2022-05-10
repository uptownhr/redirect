import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../src/app.module';
import request = require('supertest');

describe('As a Visitor', () => {
  let app: INestApplication;
  let httpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['./test/test.env'],
          isGlobal: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();
  });

  describe('I am able to Create a redirect link', () => {
    describe('so that I can test out the product without registration', () => {
      test('Creating a Redirect Link without a User creation', async () => {
        const res = await request(app.getHttpServer()).post('/redirect').send({
          urlPath: '/test-path',
          targetUrl: 'https://www.jlee.biz',
        });

        expect(res.status).toBe(201);
      });

      test('Able to create a duplicate URL', async () => {
        const payload = {
          urlPath: '/some-path',
          targetUrl: 'https://www.google.com',
        };
        const res = await request(app.getHttpServer())
          .post('/redirect')
          .send(payload);
        const res2 = await request(app.getHttpServer())
          .post('/redirect')
          .send(payload);

        expect(res2.status).toBe(201);
      });
    });
  });

  describe('I am able to visit a redirect link', () => {
    describe('so that I can be directed to the target destination', () => {
      test('Getting a Redirect URL when UNIQUE returns a new target Location in the Header', async () => {
        const urlPath = `/test-path/${Date.now()}`;
        const targetUrl = 'https://www.jlee.biz';

        const created = await request(app.getHttpServer())
          .post('/redirect')
          .send({
            urlPath,
            targetUrl,
          });

        const res = await request(app.getHttpServer()).get(urlPath);

        expect(res.status).toBe(302);
        expect(res.headers['location']).toBe(targetUrl);
      });

      test('Getting a Redirect URL that does not exist returns a 404', async () => {
        const res = await request(app.getHttpServer()).get('/test/not-found');

        expect(res.status).toBe(404);
      });

      test('Returns a redirect list response if the path is not unique', async () => {
        const urlPath = `/test-path/${Date.now()}`;
        const targetUrl = 'https://www.jlee.biz';

        await request(app.getHttpServer()).post('/redirect').send({
          urlPath,
          targetUrl,
        });

        await request(app.getHttpServer()).post('/redirect').send({
          urlPath,
          targetUrl,
        });

        const res = await request(app.getHttpServer()).get(urlPath);

        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(1);
      });
    });
  });
});
