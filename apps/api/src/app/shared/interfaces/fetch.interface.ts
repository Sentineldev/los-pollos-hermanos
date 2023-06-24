
import { Dish } from "../classes/Dish.class"

export interface FetchDish {
    fetch(): Dish[] 
}