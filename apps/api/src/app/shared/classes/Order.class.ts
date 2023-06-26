


/*


Clase que representa una orden del restaurante realizada por un cliente.
*/
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
        this.dishes = [];
    }
    


    getBill(): number {
        return this.order_bill;
    }
    getDishes(): OrderDish[]{
        return this.dishes;
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