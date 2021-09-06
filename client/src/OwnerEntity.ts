import { CarEntity } from "./interfaces/CarEntity";

export class OwnerEntity{
  id!:number
  firstName!: string;
  middleName!: string;
  lastName!: string;
  cars!: CarEntity[];
}
