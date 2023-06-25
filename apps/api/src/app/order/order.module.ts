import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { SenderOrderMail } from '../shared/classes/SenderOrderMail/SenderOrderMail.class';

@Module({
  controllers: [OrderController],
  providers: [OrderService,FetchDishFromArray,SenderOrderMail]
})
export class OrderModule {}
