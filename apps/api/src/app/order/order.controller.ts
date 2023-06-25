import { Controller, Post, Body } from '@nestjs/common';
import { ReceivedOrderDto } from './dto/received-order.dto';
import { OrderService } from './order.service';
@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}


    @Post()
    async createOrder(@Body() orderDto: ReceivedOrderDto){
        return await this.orderService.createOrder(orderDto);
    }
}
