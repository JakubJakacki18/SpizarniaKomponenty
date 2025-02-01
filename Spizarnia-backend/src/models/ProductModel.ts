import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, BeforeRemove } from "typeorm";
import { Product } from "./Product";
import { Ingredient } from "./Ingredient";
import { Category } from "./Category";
import { ListOfProductsToBuy } from "./ListOfProductsToBuy";
@Entity()
export class ProductModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name!: string;

    @Column({ type: "int", nullable: false })
    quantity!: number;

    @Column({ type: "varchar", length: 20, nullable: false })
    unit!: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price!: number;

    @Column({ type: "varchar", length: 255, nullable: true })
    type?: string;

    @OneToMany(() => Product, (product) => product.productModel, { 
        cascade: true, 
        onDelete: "CASCADE" })
    products?: Product[];
  
    @OneToMany(() => Ingredient, (ingredient) => ingredient.productModel, { 
        cascade: true,
        onDelete: "CASCADE" })
    ingredients?: Ingredient[];

    @ManyToOne(() => Category, (category) => category.productModels)
    category?: Category;

    @OneToMany(() => ListOfProductsToBuy, (list) => list.products, {})
    listOfProductsToBuy?: ListOfProductsToBuy[];
}
