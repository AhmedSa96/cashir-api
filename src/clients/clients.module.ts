import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientRepository } from './client.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Client ])
  ],
  controllers: [ClientsController],
  providers: [ClientsService, ClientRepository]
})
export class ClientsModule {}
