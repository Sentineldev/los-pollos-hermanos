import { DatabaseDish } from "../interfaces/database-dish.interface";
import { OrderDish } from "./OrderDish.class";

export class Order{
    public client_name: string;
    public client_id: string;
    public address: string;
    public email: string;

    public order_bill: number;

    private dishes: OrderDish[];
    
    constructor(){
        this.client_id = "";
        this.client_name = "";
        this.address =  "";
        this.email = "";
        this.order_bill = 0;
        this.dishes = [];
    }



    setClientName(name: string){
        this.client_name = name;
    }
    setClientId(id: string){
        this.client_id = id;
    }
    setClientAddress(address: string){
        this.address = address;
    }
    setClientEmail(email: string){
        this.email = email;
    }   
    setOrderBill(amount: number){
        this.order_bill = amount;
    }
    setDishes(dishes: OrderDish[]){
        this.dishes = dishes;
    }    

}