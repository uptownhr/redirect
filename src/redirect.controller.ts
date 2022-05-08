import {Controller, Post} from "@nestjs/common";
import {PrismaService} from "./prisma.service";
import {RedirectModel} from "./redirect.model";

@Controller('redirect')
export class RedirectController {
  constructor(private readonly prisma: PrismaService) {
  }
  @Post('/')
  async create (): Promise<RedirectModel> {
    console.log('process.env', process.env.DATABASE_URL)
    const redirect = await this.prisma.redirect.create({
      data: {
        urlPath: '/test',
        targetUrl: 'https://google.com',
        ip: '0.0.0.0'
      }
    })

    console.log('wtf', redirect)

    return {
      id: redirect.id
    }
  }
}
