import { PartialType } from "@nestjs/mapped-types";
import { Plate } from "../entities/plate.entity";

export class PlateDto extends PartialType(Plate){
}