import { Container } from './Container';
import { ProductModel } from './ProductModel';
export class Category
{
    id!: number;
    categoryName!: string;
    container?: Container;
    productModels?: ProductModel[];

}