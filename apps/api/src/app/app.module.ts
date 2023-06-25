import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishModule } from './dish/dish.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [DishModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
