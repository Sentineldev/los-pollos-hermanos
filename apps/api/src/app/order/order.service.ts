import {Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { ReceivedOrderDto } from './dto/received-order.dto';
import { Order } from '../shared/classes/Order.class';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { OrderDish } from '../shared/classes/OrderDish.class';
import { SenderOrderMail } from '../shared/classes/SenderOrderMail/SenderOrderMail.class';

@Injectable()
export class OrderService {


    constructor(
        private dishProducer: FetchDishFromArray,
        private senderOrder: SenderOrderMail

    ) {}

    async createOrder(orderDto: ReceivedOrderDto){

    
        const dishes_array = this.dishProducer.fetch();

        const new_order = new Order(orderDto.client_name,orderDto.client_id,orderDto.email,orderDto.address);

        const dishes = orderDto.dishes.map(dish => {
            const aux = dishes_array.find(element => element.dish_id === dish.dish_id);
            if(!aux) throw new UnprocessableEntityException();
            return new OrderDish(aux,dish.count);
        })
        new_order.setDishes(dishes);

        if(new_order.getBill() === orderDto.order_bill) {
            try {
                await this.senderOrder.sendOrder(new_order);    
            } catch (error) {
                throw new InternalServerErrorException();
            }
            return;
        };

        throw new UnprocessableEntityException();

    }

}
