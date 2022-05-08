import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from "../src/app.module";
import { ConfigModule } from '@nestjs/config';

import request = require('supertest')

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer;

  beforeEach(async () => {
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

  afterEach(async () => {
    await app.close();
  });

  it('server responds', async () => {
    const res = await request(app.getHttpServer()).get('/')

    expect(res).toBeTruthy()
  });
});
