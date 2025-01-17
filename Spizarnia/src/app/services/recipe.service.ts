import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../../../../Spizarnia-backend/src/models/Recipe'
import { RECIPES } from '../shared/constances/urls';


@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(RECIPES);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(RECIPES+id);
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    console.log(recipe);
    return this.http.post<Recipe>(RECIPES, recipe);
  }

  updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
    return this.http.put<Recipe>(RECIPES+id, recipe);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(RECIPES+id);
  }
}