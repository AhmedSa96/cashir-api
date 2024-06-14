import { Module } from '@nestjs/common';
import { SystemConstantsController } from './system-constants.controller';
import { SystemConstantsService } from './system-constants.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemConstants } from './entities/system-constants.entity';
import { SystemConstantsParent } from './entities/system-constants-parent.entity';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SystemConstantsRepository } from './system-constants.repository';
import { SystemConstantsParentController } from './system-constants-parent.controller';
import { SystemConstantsParentService } from './system-constants-parent.service';
import { SystemConstantsParentRepository } from './system-constants-parent.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ SystemConstantsParent, SystemConstants ])
  ],
  exports: [ SystemConstantsParentService, SystemConstantsService ],
  controllers: [SystemConstantsParentController, SystemConstantsController],
  providers: [
    SystemConstantsService,
    SystemConstantsParentService,
    SystemConstantsRepository,
    SystemConstantsParentRepository,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ]
})
export class SystemConstantsModule {}
