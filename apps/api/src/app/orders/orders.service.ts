import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { SenderOrderMail } from './classes/SenderOrderMail.class';
import { InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class OrdersService {

  constructor(private senderEmail: SenderOrderMail) {}

   create(createOrderDto: CreateOrderDto) {
    try {
      this.senderEmail.enviar(createOrderDto);
      return "Email sent successfully"
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
