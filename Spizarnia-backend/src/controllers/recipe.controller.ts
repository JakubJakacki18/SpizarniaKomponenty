import { Request, Response } from 'express';
import { Recipe } from '../models/Recipe';
import { AppDataSource } from '../data-source';

const recipeRepository = AppDataSource.getRepository(Recipe);

export class RecipeController {
    static getAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const recipes = await recipeRepository.find({ relations: ['ingredients'] });
            return res.json(recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            return res.status(500).json({ error: 'Failed to fetch recipes' });
        }
    };

    static getById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const recipe = await recipeRepository.findOne({
                where: { id: parseInt(req.params.id) },
                relations: ['ingredients'],
            });
            if (!recipe) {
                return res.status(404).json({ error: 'Recipe not found' });
            }
            return res.json(recipe);
        } catch (error) {
            console.error('Error fetching recipe:', error);
            return res.status(500).json({ error: 'Failed to fetch recipe' });
        }
    };

    static create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const recipe = recipeRepository.create(req.body);
            const savedRecipe = await recipeRepository.save(recipe);
            return res.status(201).json(savedRecipe);
        } catch (error) {
            console.error('Error creating recipe:', error);
            return res.status(500).json({ error: 'Failed to create recipe' });
        }
    };

    static update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const recipe = await recipeRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!recipe) {
                return res.status(404).json({ error: 'Recipe not found' });
            }
            recipeRepository.merge(recipe, req.body);
            const updatedRecipe = await recipeRepository.save(recipe);
            return res.json(updatedRecipe);
        } catch (error) {
            console.error('Error updating recipe:', error);
            return res.status(500).json({ error: 'Failed to update recipe' });
        }
    };

    static delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const result = await recipeRepository.delete(req.params.id);
            if (result.affected === 0) {
                return res.status(404).json({ error: 'Recipe not found' });
            }
            return res.json({ message: 'Recipe deleted successfully' });
        } catch (error) {
            console.error('Error deleting recipe:', error);
            return res.status(500).json({ error: 'Failed to delete recipe' });
        }
    };
}
