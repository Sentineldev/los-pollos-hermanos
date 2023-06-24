import { FetchDish} from "../interfaces/fetch.interface";
import { Dish } from "../classes/Dish.class";
import { Injectable } from "@nestjs/common";


class ArrayDish extends Dish{

    public dish_id: number;

    constructor(id: number, name: string, description: string, price: number){
        super(name,description,price);
        this.dish_id = id;
    }
}

class ArrayOfDish {

    private items: ArrayDish[];


    constructor(){
        this.items = [
            new ArrayDish(1,"Pollos Desayuno Clasico","Pollos Desayuno Clasico",30.00),
            new ArrayDish(2,"Galleta de Pollo","Filete de Pollo Frito sobre una galleta con mantequilla",50.00),
            new ArrayDish(3,"Pollos Sandwich de Desayuno","Dos huevos, pollo asado deshuesado, chile verde y salsa servido en nuestro panecillo clasico",80.00),
            new ArrayDish(4,"Pollos Tacos de Desayuno","Pollo especiado deshebrado con huevos, papas, chile verde y salsa.",60.00),
            new ArrayDish(5,"South Valley","Chorizo, huevos, papas, chile rojo y queso.",45.00)
        ];
    }


    getDishes(): ArrayDish[]{
        const new_array  = this.items.map(dish => ({
            dish_id: dish.dish_id,
            name: dish.name,
            description: dish.description,
            price: dish.price
        }))
        return new_array;
    }


}


@Injectable()
export class FetchDishFromArray implements FetchDish{
    
    public fetch(): ArrayDish[]{

        const dishes = new ArrayOfDish();

        return dishes.getDishes();
    }
}