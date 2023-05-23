import { Order } from "./Order.class";

export abstract class SenderOrder{


    abstract enviar(orderData: Order): void
}