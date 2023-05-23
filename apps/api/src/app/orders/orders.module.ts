import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SenderOrderMail } from './classes/SenderOrderMail.class';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService,SenderOrderMail]
})
export class OrdersModule {}
