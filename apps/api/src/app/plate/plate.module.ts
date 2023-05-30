import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateController } from './plate.controller';

@Module({
  controllers: [PlateController],
  providers: [PlateService]
})
export class PlateModule {}
