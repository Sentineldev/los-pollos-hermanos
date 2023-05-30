import { PartialType } from "@nestjs/mapped-types";
import { Order } from "../classes/Order.class";

export class CreateOrderDto extends PartialType(Order) {

    nombre: string;
    direccion: string;
    cedula: string;
    pedido: string;
    correo_electronico: string;


}
