import {IsNumber, IsPositive } from "class-validator";

export class OrderDishDto {


    @IsNumber()
    dish_id: number;
    @IsPositive()
    count: number;
}