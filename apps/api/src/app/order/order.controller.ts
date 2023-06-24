import { Controller, Post, Body } from '@nestjs/common';
import { ReceivedOrderDto } from './dto/received-order.dto';
import { OrderService } from './order.service';
@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}


    @Post()
    createOrder(@Body() orderDto: ReceivedOrderDto){
        return this.orderService.createOrder(orderDto);
    }
}
