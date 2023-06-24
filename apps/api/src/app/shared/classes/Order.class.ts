

import { OrderDish } from "./OrderDish.class";
export class Order{

    public client_name: string;
    public client_id: string;
    public email: string;
    public address: string;
    private dishes: OrderDish[];
    private order_bill: number;


    
    constructor(client_name: string, client_id: string, email: string, address: string){

        this.client_name = client_name;
        this.client_id = client_id;
        this.email = email;
        this.address = address;
        this.order_bill = 0;
        //this.dishes = dishes;
    }
   
    getBill(): number {
        return this.order_bill;
    }
    setDishes(dishes: OrderDish[]) {
        this.dishes = dishes;
        this.order_bill = this.calculateOrderBill();
    }    
    private calculateOrderBill(): number {
        
        let bill = 0
        for(const dish of this.dishes){
            bill+=dish.getDishBill();
        }

        return bill;
    }
}