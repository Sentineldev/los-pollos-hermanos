import { Injectable } from "@nestjs/common";
import { FetchDishFromArray } from "../producer/product.producer";
import { DishInterface } from "../interfaces/dish.interface";
@Injectable()
export class DishStorage {

    constructor(
        private dishProducer: FetchDishFromArray
    ) {}


    getAllDishes() {
        return this.dishProducer.fetch();
    }

    getDish(id: number) {
        const dishes = this.getAllDishes();
        return dishes.find(dish => dish.dish_id === id);
    }

    checkIfDishExists(dish: DishInterface | DishInterface[]): boolean {
        if(Array.isArray(dish)){
            for(const element of dish) {
                if (!this.getDish(element.dish_id)) return false;
            }
        }
        else {
            if (!this.getDish(dish.dish_id)) return false;
        }

        return true;
    }

}