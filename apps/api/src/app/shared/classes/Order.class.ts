


/*


Clase que representa una orden del restaurante realizada por un cliente.
*/
import { ClientInterface } from "../interfaces/client.interface";
import { OrderDish } from "./OrderDish.class";
import { v4 as uuidv4 } from 'uuid';


export class Order{

    
    private order_id: string;
    private order_bill: number;
    private client: ClientInterface;
    private dishes: OrderDish[];


    
    constructor(client_name: string, client_id: string, email: string, address: string){

        this.client = {
            client_id,
            client_name,
            email,
            address,
        }
        this.order_bill = 0;
        this.dishes = [];

        this.order_id =  uuidv4();
    }
    


    getBill(): number {
        return this.order_bill;
    }
    getDishes(): OrderDish[]{
        return this.dishes;
    }
    getId(): string {
        return this.order_id;
    }

    getEmail(): string {
        return this.client.email;
    }
    getName(): string {
        return this.client.client_name;
    }
    getAddress(): string {
        return this.client.address;
    }
    getClientId(): string {
        return this.client.client_id;
    }


    setId(id: string) {
        this.order_id = id;
    }

    //Se colocan los platillos en la orden y se calcula el monto a cancelar.
    setDishes(dishes: OrderDish[]) {
        this.dishes = dishes;
        this.order_bill = this.calculateOrderBill();
    }    
    //Se encarga de calcular el monto a cancelar por el cliente segun los platillos que haya colocado en la orden.
    private calculateOrderBill(): number {
        
        let bill = 0
        this.dishes.forEach(dish => bill+= dish.getDishBill());
        return bill;
    }
}