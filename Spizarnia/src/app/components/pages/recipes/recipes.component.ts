import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {
  recipes = [
    { name: 'Spaghetti', ingredients: ['Makaron', 'Sos pomidorowy', 'Mięso'] },
    { name: 'Omlet', ingredients: ['Jajka', 'Ser', 'Sól'] },
  ];

  filteredRecipes = this.recipes;

  filterResults(query: string) {
    query = query.toLowerCase();
    this.filteredRecipes = this.recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(query)
        )
    );
  }

  resetSearch() {
    this.filteredRecipes = this.recipes;
  }

  deleteRecipe(recipe: any) {
    this.recipes = this.recipes.filter((r) => r !== recipe);
    this.filteredRecipes = this.recipes;
  }
}
