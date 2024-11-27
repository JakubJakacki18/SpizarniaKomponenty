import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import {Container} from "./Container"
import { Product } from "./Product";
import { Ingredient } from "./Ingredient";
import { ListOfProductsToBuy } from "./ListOfProductsToBuy";
@Entity()
export class ProductModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ type: "int", nullable: false })
    quantity: number;

    @Column({ type: "varchar", length: 20, nullable: false })
    unit: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;

    @OneToMany(() => Product, (product) => product.productModel)
    products: Product[];
  
    @OneToMany(() => Ingredient, (ingredient) => ingredient.productModel)
    ingredients: Ingredient[];
  
    @ManyToOne(() => ListOfProductsToBuy, (list) => list.products)
    listOfProductsToBuy: ListOfProductsToBuy[];
}
