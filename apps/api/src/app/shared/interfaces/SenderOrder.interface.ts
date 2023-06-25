import { Order } from "../classes/Order.class"

export interface SenderOrder {
    sendOrder(order: Order): Promise<void>
}