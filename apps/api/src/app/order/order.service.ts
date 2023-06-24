import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ReceivedOrderDto } from './dto/received-order.dto';
import { Order } from '../shared/classes/Order.class';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { OrderDish } from '../shared/classes/OrderDish.class';

@Injectable()
export class OrderService {


    constructor(
        private dishProducer: FetchDishFromArray,

    ) {}

    createOrder(orderDto: ReceivedOrderDto){

    
        const dishes_array = this.dishProducer.fetch();

        const new_order = new Order(orderDto.client_name,orderDto.client_id,orderDto.email,orderDto.address);

        const dishes = orderDto.dishes.map(dish => {
            const aux = dishes_array.find(element => element.dish_id === dish.dish_id);
            return new OrderDish(aux,dish.count);
        })
        new_order.setDishes(dishes);

        if(new_order.getBill() === orderDto.order_bill) return new_order ;

        throw new UnprocessableEntityException("Corrupted data")

    }

}
