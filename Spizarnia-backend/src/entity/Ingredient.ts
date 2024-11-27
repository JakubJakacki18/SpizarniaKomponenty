import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import {Container} from "./Container"
import { ProductModel } from "./ProductModel";
import {Recipe} from "./Recipe"

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductModel, (productModel) => productModel.ingredients)
    productModel: ProductModel;
  
    @Column()
    quantity: number;
  
    @ManyToMany(() => Recipe, (recipe) => recipe.ingredients)
    @JoinTable() 
    recipes: Recipe[];
}