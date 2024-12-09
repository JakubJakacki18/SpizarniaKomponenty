import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../../services/recipe.service';
import { Recipe } from '../../../../shared/models/Recipe';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  recipeId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      name: [''],
      ingredients: [''],
    });
  }

  ngOnInit(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe({
      next: (recipe: Recipe) => {
        const ingredients = recipe.ingredients
          .map((i: any) => (typeof i === 'string' ? i : i.name))
          .join(', ');
        this.recipeForm.patchValue({
          name: recipe.name,
          ingredients,
        });
      },
      error: (err) => console.error('Error loading recipe:', err),
    });
  }

  onSubmit(): void {
    const updatedRecipe: Recipe = {
      id: this.recipeId,
      name: this.recipeForm.value.name,
      ingredients: this.recipeForm.value.ingredients
        .split(',')
        .map((ingredient: string) => ({ name: ingredient.trim() })),
    };

    this.recipeService.updateRecipe(this.recipeId, updatedRecipe).subscribe({
      next: () => this.router.navigate(['/recipes']),
      error: (err) => console.error('Error updating recipe:', err),
    });
  }
}
