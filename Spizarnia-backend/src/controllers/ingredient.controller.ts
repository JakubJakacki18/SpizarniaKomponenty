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
    const { productModelId, quantity, recipeIds } = req.body;

    try {
      const productModel = await productModelRepository.findOneBy({ id: productModelId });
      if (!productModel) {
        res.status(404).json({ error: `ProductModel with id ${productModelId} was not found` });
        return;
      }

      let recipes = [];
      if (recipeIds && recipeIds.length > 0) {
        recipes = await recipeRepository.findByIds(recipeIds);
        if (recipes.length !== recipeIds.length) {
          res.status(404).json({ error: "Some recipes were not found" });
          return;
        }
      }

      const newIngredient = ingredientRepository.create({
        productModel,
        quantity,
        recipes,
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
};
