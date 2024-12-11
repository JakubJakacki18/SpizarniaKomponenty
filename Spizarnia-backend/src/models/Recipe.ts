import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Ingredient } from "./Ingredient";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ default: true })
    finished!: boolean;

    @ManyToMany(() => Ingredient, (ingredient) => ingredient.recipes)
    ingredients!: Ingredient[];
}
