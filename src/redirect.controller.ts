import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RedirectModel } from './redirect.model';
import { Request, Response } from 'express';

@Controller('/')
export class RedirectController {
  constructor(private readonly prisma: PrismaService) {}
  @Post('/redirect')
  async create(): Promise<RedirectModel> {
    const redirect = await this.prisma.redirect.create({
      data: {
        urlPath: '/test',
        targetUrl: 'https://google.com',
        ip: '0.0.0.0',
      },
    });

    return {
      id: redirect.id,
    };
  }

  @Get('*')
  async get(@Req() request: Request, @Res() res: Response): Promise<void> {
    const redirect = await this.prisma.redirect.findFirst({
      where: {
        urlPath: request.url,
      },
    });

    if (!redirect) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return res.redirect(redirect.targetUrl);
  }
}
