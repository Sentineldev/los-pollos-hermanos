import { Order } from "./Order.class";
import { Dish } from "./Dish.class";

export class OrderDish{
    private dish: Dish;
    private count: number;
    //private order: Order;
    private dish_bill: number;

    constructor(dish: Dish, count: number){
        this.dish = dish;
        this.count = count;
        //this.order = order;
        this.dish_bill = 0;
    }



    getDishBill(): number {
        return this.dish.price * this.count;
    }
}