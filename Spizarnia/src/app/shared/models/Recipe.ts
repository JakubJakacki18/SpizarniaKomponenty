import { Ingredient } from './Ingredient'; // Adjust the path based on your project structure

export interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[] | string[]; // Support both Ingredient objects and plain strings
  finished?: boolean; // Optional field
}
