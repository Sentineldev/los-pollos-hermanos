import { InjectRepository } from "nestjs-fireorm";
import { OrderEntity } from "../entities/Order.entity";
import { BaseFirestoreRepository } from "fireorm";
import { Order } from "../classes/Order.class";
import { OrderInterface } from "../interfaces/order.interface";

export class OrderRepository {
    
    constructor(
        @InjectRepository(OrderEntity)
        private orderRepository: BaseFirestoreRepository<OrderEntity>
    ) {}
     

    create(order: OrderInterface) {
        this.orderRepository.create(order);
    }
}