import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Ingredient } from './Ingredient';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.recipes)
  ingredients: Ingredient[];
  
}