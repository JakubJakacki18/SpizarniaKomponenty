import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Recipe } from "../models/Recipe";
import { Ingredient } from "../models/Ingredient";
import { AppDataSource } from "../data-source";
import { ProductModel } from "../models/ProductModel";

const recipeRepository: Repository<Recipe> = AppDataSource.getRepository(Recipe);
const ingredientRepository: Repository<Ingredient> = AppDataSource.getRepository(Ingredient);
const productModelRepository: Repository<ProductModel> = AppDataSource.getRepository(ProductModel);

export const RecipeController = {
  async getAll(req: Request, res: Response) {
    try {
      const recipes = await recipeRepository.find({ relations: ["ingredients", "ingredients.productModel"] });
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot fetch recipes" });
    }
  },

  async getOne(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const recipe = await recipeRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["ingredients"],
      });

      if (!recipe) {
        res.status(404).json({ error: `Recipe with id ${id} was not found` });
        return;
      }

      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot fetch recipe" });
    }
  },

  async create(req: Request, res: Response) {
    const { name, ingredients, finished } = req.body;
    const ingredientsFromFront = ingredients;
    try{
      let ingredients =await RecipeController.createOrGetIngredients(ingredientsFromFront);
     
      if(ingredients.length !== ingredientsFromFront.length)
      {
        console.log("Some ingredients were not added to recipe");
        res.status(500).json({error: "Some ingredients were not added to recipe"});
        return;
      }
      if(ingredients.length === 0)
      {
        console.log("No ingredients were added to recipe");
        res.status(500).json({error: "No ingredients were added to recipe"});
        return;
      } 

      console.log(finished);
      const newRecipe = recipeRepository.create({
        name,
        ingredients,
        finished: (finished !== undefined) ? finished : true, //Defultowo false
      });

      await recipeRepository.save(newRecipe);
      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Recipe was not created" });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, ingredientIds, finished } = req.body;

    try {
      const recipe = await recipeRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["ingredients"],
      });

      if (!recipe) {
        res.status(404).json({ error: `Recipe with id ${id} was not found` });
        return;
      }

      if (name !== undefined) {
        recipe.name = name;
      }

      if (ingredientIds) {
        const ingredients = await ingredientRepository.findByIds(ingredientIds);
        if (ingredients.length !== ingredientIds.length) {
          res.status(404).json({ error: "Some ingredients were not found" });
          return;
        }
        recipe.ingredients = ingredients;
      }

      if (finished !== undefined) {
        recipe.finished = finished;
      }

      await recipeRepository.save(recipe);
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Recipe was not updated" });
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const recipe = await recipeRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["ingredients"],
      });

      if (!recipe) {
        res.status(404).json({ error: `Recipe with id ${id} was not found` });
        return;
      }


      await recipeRepository.remove(recipe);
      res.json({ message: `Recipe with id ${id} was removed successfully from database` });
    } catch (error) {
      res.status(500).json({ error: "Internal error: Recipe was not deleted" });
    }
  },
  async createOrGetIngredients(ingredientsFromFront : any) : Promise<Ingredient[]>
  {
    console.log(ingredientsFromFront);
    const ingredients : Ingredient[] = [];
    for (const ingredient of ingredientsFromFront) {
            const ingredientFromDb = await RecipeController.getIngredientFromDbOrCreateOne(ingredient.productModel.id, ingredient.quantity);
            //console.log(ingredientFromDb, "ingredientFromDb");
            if(!!ingredientFromDb)
            {
              ingredients.push(ingredientFromDb)
              //console.log("Ingredient was created",ingredients);
            } else
            {
              console.log("Ingredient was not created",ingredient);
            }           
              
          }
          //console.log(ingredients,"outside foreach");
          return ingredients;
          
  },
  async getIngredientFromDbOrCreateOne(productModelId: any, quantity: any) : Promise<Ingredient> {
    const ingredientFromDb = await ingredientRepository
    .createQueryBuilder("ingredient")
    .where("ingredient.productModelId = :productModelId", { productModelId })
    .andWhere("ingredient.quantity = :quantity", { quantity })
    .getOne(); 
    if(!!ingredientFromDb)
    {
      return ingredientFromDb;
    } 
    else
    {
      const productModel = await productModelRepository.findOne({ where: { id: productModelId } });
      if (!productModel) {
        return null;
      }
  
      const ingredient = ingredientRepository.create({
        productModel,
        quantity,
      });

      await ingredientRepository.save(ingredient);
      return ingredient;
    }           
        
  }
};
