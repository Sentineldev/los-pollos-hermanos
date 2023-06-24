import { Order } from "./Order.class";


export interface SenderOrder {
    enviar(orderData: Order): Promise<void>
}