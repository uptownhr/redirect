import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {globalConfiguration} from "./config";
import {RedirectController} from "./redirect.controller";
import {PrismaService} from "./prisma.service";

const isDev = !['production', 'test'].includes(process.env.NODE_ENV || 'development');

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !isDev,
      envFilePath: ['./.env', './dev.env'],
      isGlobal: true,
      load: [globalConfiguration],
    }),
  ],
  controllers: [
    RedirectController
  ],
  providers: [
    PrismaService
  ]
})
export class AppModule {}
