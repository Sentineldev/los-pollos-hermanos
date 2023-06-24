import { IsArray, IsEmail, IsNotEmpty, IsPositive, ValidateNested} from "class-validator";
import { OrderDishDto } from "./order-dish.dto";
import { Type } from "class-transformer";

export class ReceivedOrderDto {


    @IsNotEmpty()
    client_name: string;
    @IsNotEmpty()
    client_id: string;
    @IsNotEmpty()
    address: string;
    @IsEmail()
    email: string;
    @IsPositive()
    order_bill: number;

    
    @IsArray()
    @ValidateNested({each:true})
    @Type(() => OrderDishDto)
    dishes: OrderDishDto[]
}