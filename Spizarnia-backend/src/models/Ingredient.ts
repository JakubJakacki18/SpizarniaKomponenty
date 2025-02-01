import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, JoinColumn, BeforeRemove, getManager } from "typeorm";
import { DataSource } from 'typeorm';
import { ProductModel } from "./ProductModel";
import {Recipe} from "./Recipe"


@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => ProductModel, (productModel) => productModel.ingredients, {
      onDelete: "CASCADE"
      })
      @JoinColumn({name: "productModelId"})
    productModel?: ProductModel;
  
    @Column("decimal")
    quantity!: number;
  
    @ManyToMany(() => Recipe, (recipe) => recipe.ingredients)
    @JoinTable() 
    recipes?: Recipe[];
}