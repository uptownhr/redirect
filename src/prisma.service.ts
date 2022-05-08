/* istanbul ignore file */
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from './prisma/generated/prisma.client';

export * from './prisma/generated/prisma.client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
