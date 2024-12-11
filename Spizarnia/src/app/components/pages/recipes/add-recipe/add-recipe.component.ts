import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../../../services/recipe.service';
import { Recipe } from '../../../../shared/models/Recipe';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent {
  constructor(private recipeService: RecipeService, private router: Router) { }

  onSubmit(event: Event): void {
    event.preventDefault(); // Zapobiega przeładowaniu strony

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    const recipeData: Recipe = {
      id: 0, // Domyślnie 0, backend ustawi poprawne ID
      name: formData.get('name') as string,
      ingredients: (formData.get('ingredients') as string)
        .split(',')
        .map((ingredient) => ingredient.trim()),
      finished: false, // Dodajemy brakujące pole "finished"
    };

    this.recipeService.addRecipe(recipeData).subscribe({
      next: () => {
        alert('Przepis został dodany!');
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.error('Błąd podczas dodawania przepisu:', err);
        alert('Wystąpił błąd podczas dodawania przepisu.');
      },
    });
  }
}
