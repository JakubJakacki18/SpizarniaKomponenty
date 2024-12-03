import { Category } from "./Category";

export class ProductModel
{
    id!:number;
    name!:string;
    price!:number;
    unit!:string;
    quantity!:number;
    category!:Category;
    type?:string;
}