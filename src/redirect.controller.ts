import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateRedirectInput, RedirectModel } from './redirect.model';
import { Request, Response } from 'express';

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
    };
  }

  @Get('*')
  async get(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<RedirectModel[] | void> {
    const redirects = await this.prisma.redirect.findMany({
      where: {
        urlPath: request.url,
      },
    });

    if (redirects.length === 0)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    if (redirects.length === 1) return res.redirect(redirects[0].targetUrl);

    return redirects.map((r) => ({
      id: r.id,
    }));
  }
}
