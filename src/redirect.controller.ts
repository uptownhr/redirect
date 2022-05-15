import {
  Body,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateRedirectInput, RedirectModel } from './redirect.model';
import { Request } from 'express';

@Controller('/')
export class RedirectController {
  constructor(private readonly prisma: PrismaService) {}
  @Post('/redirect')
  async create(@Body() input: CreateRedirectInput): Promise<RedirectModel> {
    const redirect = await this.prisma.redirect.create({
      data: {
        urlPath: input.urlPath,
        targetUrl: input.targetUrl,
        ip: '0.0.0.0',
      },
    });

    return {
      id: redirect.id,
      targetUrl: redirect.targetUrl
    };
  }

  @Get('*')
  async get(
    @Req() request: Request,
  ): Promise<RedirectModel[] | void> {
    const redirects = await this.prisma.redirect.findMany({
      where: {
        urlPath: request.url,
      },
    });

    return redirects.map((r) => ({
      id: r.id,
      targetUrl: r.targetUrl
    }));
  }
}
