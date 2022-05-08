import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {ConfigModule} from "@nestjs/config";
import {AppModule} from "../src/app.module";
import request = require('supertest')

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
  })

  describe('I am able to Create a redirect link', () => {
    describe('so that I can test out the product without registration', () => {
      test('Creating a Redirect Link without a User creation', async () => {
        const res = await request(app.getHttpServer()).post('/redirect')

        console.log(res.body)
        expect(res.status).toBe(201)
      })
    })
  })

  describe('I am able to visit a redirect link', () => {
    describe('so that I can be directed to the target destination', () => {
      test('Getting a Redirect URL returns a new target Location in the Header', async () => {
        const res = await request(app.getHttpServer()).get('/test')

        expect(res.status).toBe(302)
        expect(res.headers['location']).toBe('https://google.com')
      })

      test('Getting a Redirect URL that does not exist returns a 404', async () => {
        const res = await request(app.getHttpServer()).get('/test/not-found')

        expect(res.status).toBe(404)
      })
    })
  })
})
