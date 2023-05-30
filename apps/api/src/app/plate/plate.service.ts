import { Injectable } from '@nestjs/common';
import { CreatePlateDto } from './dto/create-plate.dto';
import { UpdatePlateDto } from './dto/update-plate.dto';
import { PlateDto } from './dto/plate.dto';

@Injectable()
export class PlateService {


  plates: PlateDto[] = [
    {plate_id: 1, name: "Pollos Desayuno Clasico", description:"Nuestro Pollos Burrito Basico",price:30.00},
    {plate_id: 2, name: "Galleta de Pollo", description:"Filete de Pollo Frito sobre una galleta con mantequilla",price: 50.00},
    {plate_id: 3, name: "Pollos Sandwich de Desayuno", description: "Dos huevos, pollo asado deshuesado, chile verde y salsa servido en nuestro panecillo clasico", price:80.00},
    {plate_id: 4, name: "Pollos Tacos de Desayuno", description: "Pollo especiado deshebrado con huevos, papas, chile verde y salsa.", price:60.00},
    {plate_id: 5, name: "South Valley", description: "Chorizo, huevos, papas, chile rojo y queso.", price:45.00},

  ]

  create(createPlateDto: CreatePlateDto) {
    return 'This action adds a new plate';
  }

  findAll() {
    return this.plates;
  }

  findOne(id: number) {
    return `This action returns a #${id} plate`;
  }

  update(id: number, updatePlateDto: UpdatePlateDto) {
    return `This action updates a #${id} plate`;
  }

  remove(id: number) {
    return `This action removes a #${id} plate`;
  }
}
