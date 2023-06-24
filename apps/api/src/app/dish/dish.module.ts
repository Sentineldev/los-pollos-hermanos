import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { FetchDishFromArray } from '../shared/producer/product.producer';

@Module({
  controllers: [DishController],
  providers: [DishService,FetchDishFromArray],
})
export class DishModule {}
