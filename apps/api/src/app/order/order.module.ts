import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FetchDishFromArray } from '../shared/producer/product.producer';

@Module({
  controllers: [OrderController],
  providers: [OrderService,FetchDishFromArray]
})
export class OrderModule {}
