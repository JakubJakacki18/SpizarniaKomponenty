import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Ingredient } from "../models/Ingredient";
import { ProductModel } from "../models/ProductModel";
import { Recipe } from "../models/Recipe";
import { AppDataSource } from "../data-source";

const ingredientRepository: Repository<Ingredient> = AppDataSource.getRepository(Ingredient);
const productModelRepository: Repository<ProductModel> = AppDataSource.getRepository(ProductModel);
const recipeRepository: Repository<Recipe> = AppDataSource.getRepository(Recipe);

export const IngredientController = {
  async getAll(req: Request, res: Response) {
    try {
      const ingredients = await ingredientRepository.find({ relations: ["productModel", "recipes"] });
      res.json(ingredients);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot fetch ingredients" });
    }
  },

  async getOne(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const ingredient = await ingredientRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["productModel", "recipes"],
      });

      if (!ingredient) {
        res.status(404).json({ error: `Ingredient with id ${id} was not found` });
        return;
      }

      res.json(ingredient);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Cannot fetch ingredient" });
    }
  },

  async create(req: Request, res: Response) {
    const { productModelId, quantity,  } = req.body;

    try {
      const productModel = await productModelRepository.findOneBy({ id: productModelId });
      if (!productModel) {
        res.status(404).json({ error: `ProductModel with id ${productModelId} was not found` });
        return;
      }

      const newIngredient = ingredientRepository.create({
        productModel,
        quantity,
      });

      await ingredientRepository.save(newIngredient);
      res.status(201).json(newIngredient);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Ingredient was not created" });
    }
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { productModelId, quantity, recipeIds } = req.body;

    try {
      const ingredient = await ingredientRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["productModel", "recipes"],
      });

      if (!ingredient) {
        res.status(404).json({ error: `Ingredient with id ${id} was not found` });
        return;
      }

      if (productModelId) {
        const productModel = await productModelRepository.findOneBy({ id: productModelId });
        if (!productModel) {
          res.status(404).json({ error: `ProductModel with id ${productModelId} was not found` });
          return;
        }
        ingredient.productModel = productModel;
      }

      if (recipeIds) {
        const recipes = await recipeRepository.findByIds(recipeIds);
        if (recipes.length !== recipeIds.length) {
          res.status(404).json({ error: "Some recipes were not found" });
          return;
        }
        ingredient.recipes = recipes;
      }

      if (quantity !== undefined) {
        ingredient.quantity = quantity;
      }

      await ingredientRepository.save(ingredient);
      res.json(ingredient);
    } catch (error) {
      res.status(500).json({ error: "Internal error: Ingredient was not updated" });
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const ingredient = await ingredientRepository.findOne({
        where: { id: parseInt(id) },
        relations: ["recipes"],
      });

      if (!ingredient) {
        res.status(404).json({ error: `Ingredient with id ${id} was not found` });
        return;
      }

      await ingredientRepository.remove(ingredient);
      res.json({ message: `Ingredient with id ${id} was removed successfully from database` });
    } catch (error) {
      res.status(500).json({ error: "Internal error: Ingredient was not deleted" });
    }
  },
  async createOrGetIngredients(ingredientsFromFront : any)
  {
    const ingredients : Ingredient[] = [];
     ingredientsFromFront.forEach(async ingredient => {
            const ingredientFromDb = await IngredientController.getIngredientFromDbOrCreateOne(ingredient.productModelId, ingredient.quantity);
            if(!!ingredientFromDb)
            {
              ingredients.push(ingredientFromDb)
            } else
            {
    
            }           
              
          });
          
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
      const mockRequest = {
        body: {
          productModelId: productModelId,
          quantity: quantity,
        },
      } as Request;
      const mockResponse = {
        status: (statusCode: number) => {
          console.log("Status:", statusCode);
          return mockResponse;
        },
        json: (data: any) => {
          console.log("Response data:", data);
        },
      } as unknown as Response;
      await IngredientController.create(mockRequest, mockResponse);
      return mockResponse
    }           
        
  }
        
};


