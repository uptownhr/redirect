/* istanbul ignore file */
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from './generated/prisma.client';
import { ConfigService } from '@nestjs/config';

export * from './generated/prisma.client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor(config: ConfigService) {
    const dbUrl = config.get<string>('db.url');
    super({
      datasources: {
        db: {
          url: dbUrl,
        },
      },
    });
  }
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
