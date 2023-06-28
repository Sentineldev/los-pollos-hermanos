import { Collection } from "fireorm";
import { ClientInterface } from "../interfaces/client.interface";
import { OrderDishInterface } from "../interfaces/dish.interface";



@Collection('order')
export class OrderEntity {
    id: string;

    order_id: string;
    order_bill: number;
    client: ClientInterface;
    dishes: OrderDishInterface[]
}