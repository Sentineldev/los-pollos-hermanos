//import { Order } from "./Order.class";
import { Dish } from "./Dish.class";



//Esta clase representa los platillos en la orden como tal, la cantidad, el 

export class OrderDish{
    private dish: Dish;
    private count: number;
    //private order: Order;
    private dish_bill: number;

    constructor(dish: Dish, count: number){
        this.dish = dish;
        this.count = count;
        //this.order = order;
        this.dish_bill = this.calculateDishBill();
    }



    getDish(): Dish {
        return this.dish;
    }

    getDishBill(): number {
        return this.dish_bill;
    }
    
    getCount(): number {
        return this.count;
    }

    private calculateDishBill(): number {
        return this.dish.price * this.count;
    }
}