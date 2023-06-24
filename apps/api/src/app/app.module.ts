import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { PlateModule } from './plate/plate.module';
import { DishModule } from './dish/dish.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [OrdersModule, PlateModule, DishModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
