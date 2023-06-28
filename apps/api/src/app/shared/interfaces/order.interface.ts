import { ClientInterface } from "./client.interface";
import { OrderDishInterface } from "./dish.interface";

export interface OrderInterface {
    order_id: string,
    order_bill: number,
    client: ClientInterface,
    dishes: OrderDishInterface[]
}