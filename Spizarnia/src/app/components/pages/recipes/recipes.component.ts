import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../shared/models/Recipe';
import { Ingredient } from '../../../shared/models/Ingredient'; // Ensure the Ingredient model is defined

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  displayedRecipes: Recipe[] = [];
  searchQuery: string = '';

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.displayedRecipes = [...this.recipes];
        this.renderRecipes();
      },
      error: (err) => console.error('Error loading recipes:', err),
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.trim().toLowerCase();
  }

  filterByName(): void {
    if (this.searchQuery) {
      this.displayedRecipes = this.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(this.searchQuery)
      );
    } else {
      this.displayedRecipes = [...this.recipes];
    }
    this.renderRecipes();
  }

  resetFilters(): void {
    this.displayedRecipes = [...this.recipes];
    this.searchQuery = '';
    this.renderRecipes();
  }

  filterByPantry(): void {
    this.displayedRecipes = this.recipes.filter(
      (recipe) => recipe.ingredients && recipe.ingredients.length > 0
    );
    this.renderRecipes();
  }

  navigateToAddRecipe(): void {
    this.router.navigate(['/recipes/add']);
  }

  editRecipe(recipeId: number): void {
    this.router.navigate([`/recipes/edit/${recipeId}`]);
  }

  deleteRecipe(recipeId: number): void {
    if (confirm('Czy na pewno chcesz usunąć ten przepis?')) {
      this.recipeService.deleteRecipe(recipeId).subscribe({
        next: () => {
          this.loadRecipes();
          alert('Przepis został usunięty.');
        },
        error: (err) => console.error('Error deleting recipe:', err),
      });
    }
  }

  renderRecipes(): void {
    const tableBody = document.getElementById('recipes-body');
    if (tableBody) {
      tableBody.innerHTML = ''; // Clear previous rows
      this.displayedRecipes.forEach((recipe) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = recipe.name;
        row.appendChild(nameCell);

        const ingredientsCell = document.createElement('td');
        ingredientsCell.textContent = this.getIngredientNames(recipe);
        row.appendChild(ingredientsCell);

        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edytuj';
        editButton.addEventListener('click', () => this.editRecipe(recipe.id));
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Usuń';
        deleteButton.addEventListener('click', () => this.deleteRecipe(recipe.id));
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);
        tableBody.appendChild(row);
      });
    }
  }

  getIngredientNames(recipe: Recipe): string {
    if (!recipe.ingredients || recipe.ingredients.length === 0) {
      return 'Brak składników';
    }
    return recipe.ingredients
      .map((ingredient) =>
        typeof ingredient === 'object' && 'name' in ingredient
          ? (ingredient as Ingredient).name
          : String(ingredient)
      )
      .join(', ');
  }
}
