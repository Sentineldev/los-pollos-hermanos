import {Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { ReceivedOrderDto } from './dto/received-order.dto';
import { Order } from '../shared/classes/Order.class';
import { OrderDish } from '../shared/classes/OrderDish.class';
import { SenderOrderMail } from '../shared/classes/SenderOrderMail/SenderOrderMail.class';
import { DishStorage } from '../shared/storage/dish.storage';
import { OrderRepository } from '../shared/repository/order.repository';
import { OrderInterface } from '../shared/interfaces/order.interface';

@Injectable()
export class OrderService {


    constructor(
        private dishStorage: DishStorage,
        private senderOrder: SenderOrderMail,
        private orderRepository: OrderRepository

    ) {}

    async createOrder(orderDto: ReceivedOrderDto){

    
        if (!this.dishStorage.checkIfDishExists(orderDto.dishes)) throw new UnprocessableEntityException();


        const new_order = new Order(orderDto.client_name,orderDto.client_id,orderDto.email,orderDto.address);

        const dishes = orderDto.dishes.map(dish => {
            const aux = this.dishStorage.getDish(dish.dish_id);
            return new OrderDish(aux,dish.count);
        })
        new_order.setDishes(dishes);

        if (new_order.getBill() !== orderDto.order_bill) throw new UnprocessableEntityException();
        
        
        try {
            await this.senderOrder.sendOrder(new_order);    
        } catch (error) {
            throw new InternalServerErrorException();
        }
        const firestore_object: OrderInterface = {
            order_id: new_order.getId(),
            order_bill: new_order.getBill(),
            client: { client_name: new_order.getName(), client_id: new_order.getClientId(), email: new_order.getEmail(), address: new_order.getAddress() },
            dishes: new_order.getDishes().map(element => ({
                dish: { name: element.getDish().name, description: element.getDish().description, price: element.getDish().price  },
                count: element.getCount(),
                dish_bill: element.getDishBill()
            }))
        }
       
        this.orderRepository.create(firestore_object);
    }

}
