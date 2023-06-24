import { Injectable } from '@nestjs/common';
import { FetchDishFromArray } from '../shared/producer/product.producer';

@Injectable()
export class DishService {



    constructor(private dishProducer: FetchDishFromArray){}

    
    fetchDishes(){

        return this.dishProducer.fetch()
    }
}
