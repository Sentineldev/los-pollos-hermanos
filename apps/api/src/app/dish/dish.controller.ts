import { Controller, Get} from '@nestjs/common';
import { DishService } from './dish.service';

@Controller('dish')
export class DishController {


    constructor(private dishService: DishService) {}


    @Get()
    fetchDishes(){
        return this.dishService.fetchDishes();
    }


}
