import { Router, Request, Response, NextFunction } from 'express';
import { RecipeController } from '../controllers/recipe.controller';

const recipeRouter = Router();

// Helper function to wrap async functions and catch errors
const asyncHandler =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };

// Trasy dla przepisów
recipeRouter.get('/', asyncHandler(RecipeController.getAll));
recipeRouter.get('/:id', asyncHandler(RecipeController.getById));
recipeRouter.post('/', asyncHandler(RecipeController.create));
recipeRouter.put('/:id', asyncHandler(RecipeController.update));
recipeRouter.delete('/:id', asyncHandler(RecipeController.delete));

export default recipeRouter;
