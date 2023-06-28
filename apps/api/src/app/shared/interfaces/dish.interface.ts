export interface DishInterface {
    dish_id?: number;
    name?: string;
    description?: string;
    price?: number;
}

export interface OrderDishInterface {
    dish: DishInterface,
    count: number,
    dish_bill: number
}