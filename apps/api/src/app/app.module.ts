import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { PlateModule } from './plate/plate.module';

@Module({
  imports: [OrdersModule, PlateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
