import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Makes Prisma available to all other modules in the app
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exposes the service to the outside world
})
export class PrismaModule {}