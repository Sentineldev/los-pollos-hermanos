import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SenderOrderMail } from '../shared/classes/SenderOrderMail/SenderOrderMail.class';
import { DishStorage } from '../shared/storage/dish.storage';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { FireormModule } from 'nestjs-fireorm';
import { OrderEntity } from '../shared/entities/Order.entity';
import { OrderRepository } from '../shared/repository/order.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService,DishStorage,FetchDishFromArray,SenderOrderMail,OrderRepository],
  imports: [FireormModule.forFeature([OrderEntity])]
})
export class OrderModule {}
