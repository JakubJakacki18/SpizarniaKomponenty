import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, BeforeRemove, getManager } from "typeorm";
import { DataSource } from 'typeorm';
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
    
    
    

    @BeforeRemove()
    async updateRecipesBeforeRemove() {
        const dataSource = Ingredient.dataSource;
        const recipeRepository = dataSource.getRepository(Recipe);
    

        for (const recipe of this.recipes) {
          recipe.finished = false; 
          await recipeRepository.save(recipe); 
        }
      }

      static dataSource: DataSource;

}