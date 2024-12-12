// import { Component, ViewChild, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { AddRecipeComponent } from "./add-recipe/add-recipe.component";

// @Component({
//   selector: 'app-recipes',
//   standalone: true,
//   imports: [CommonModule, FormsModule, MatTableModule, MatSortModule, AddRecipeComponent],
//   templateUrl: './recipes.component.html',
//   styleUrls: ['./recipes.component.css'],
// })
// export class RecipesComponent implements OnInit {
//   recipes: any[] = [];
//   newRecipe = { name: '', ingredients: '' }; 
//   displayedColumns: string[] = ['name', 'ingredients', 'actions'];
//   searchTerm: string = '';
//   dataSource = new MatTableDataSource<any>([]); 
//   snackBar: any;

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.getAllRecipes();
//   }

//   getAllRecipes() {
//     this.http.get<RecipesComponent[]>('http://localhost:5000/api/recipe').subscribe(
//       (data) => {
//         this.recipes = data;
//         this.dataSource.data = data;
//       },
//       (error) => {
//         console.error('Error fetching recipes:', error);
//         this.snackBar.open('Nie udało się pobrać przepisów. Sprawdź połączenie z serwerem.', 'OK', {
//           duration: 3000,
//         });
//       }
//     );
//   }
//     // getAllRecipes() {
//   //   this.http.get<RecipesComponent[]>('http://localhost:5000/api/recipe').subscribe({
//   //     next: (data) => {
//   //       this.recipes = data;
//   //       this.dataSource.data = data;
//   //     },
//   //     error: (err) => console.error('Błąd podczas pobierania modeli produktów:', err),
//   //   });

//   // }

//   addRecipe() {
//     if (!this.newRecipe.name || !this.newRecipe.ingredients.trim()) {
//       alert('Uzupełnij wszystkie pola przed dodaniem przepisu!');
//       return;
//     }
  
//     const ingredientsArray = this.newRecipe.ingredients.split(',').map((item) => item.trim());
//     const recipeToAdd = {
//       name: this.newRecipe.name,
//       ingredients: ingredientsArray,
//     };
  
//     console.log('Sending recipe to backend:', recipeToAdd);
  
//     this.http.post<any>('http://localhost:5000/api/recipe', recipeToAdd).subscribe(
//       (response) => {
//         console.log('Recipe added successfully:', response);
//         this.recipes.push(response); // Add new recipe to the array
//         this.dataSource.data = [...this.recipes]; // Update the table's data source
//         this.newRecipe = { name: '', ingredients: '' }; // Reset the form
//       },
//       (error) => {
//         console.error('Error adding recipe:', error);
//         if (error.error && error.error.message) {
//           alert(`Error: ${error.error.message}`);
//         } else {
//           alert('Wystąpił błąd podczas dodawania przepisu. Sprawdź serwer.');
//         }
//       }
//     );
//   }
  

//   onSearch() {
//     if (this.searchTerm.length >= 3) {
//       const searchTermLower = this.searchTerm.toLowerCase();
//       this.dataSource.filter = searchTermLower;
//       this.dataSource.filterPredicate = (data: any, filter: string) => {
//         return (
//           data.name.toLowerCase().includes(filter) ||
//           data.ingredients.some((ingredient: string) =>
//             ingredient.toLowerCase().includes(filter)
//           )
//         );
//       };
//     } else {
//       this.dataSource.filter = ''; // Reset the filter
//     }
//   }

//   resetSearch() {
//     this.searchTerm = '';
//     this.dataSource.filter = ''; // Reset the filter
//   }

//   deleteRecipe(recipe: any) {
//     if (confirm('Czy na pewno chcesz usunąć ten przepis?')) {
//       this.http.delete(`http://localhost:5000/api/recipe/${recipe.id}`).subscribe(
//         () => {
//           this.recipes = this.recipes.filter((r) => r.id !== recipe.id);
//           this.dataSource.data = this.recipes;
//         },
//         (error) => {
//           console.error('Error deleting recipe:', error);
//         }
//       );
//     }
//   }
// }
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Define an interface for recipes
interface Recipe {
  id?: number; // Optional for new recipes
  name: string;
  ingredients: string[];
}

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatSortModule, MatSnackBarModule],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  newRecipe = { name: '', ingredients: '' }; // Temporary form data
  displayedColumns: string[] = ['name', 'ingredients', 'actions'];
  searchTerm: string = '';
  dataSource = new MatTableDataSource<Recipe>([]);
  showDialog: boolean = false;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getAllRecipes();
    this.dataSource.sort = this.sort;
  }

  getAllRecipes() {
    this.http.get<Recipe[]>('http://localhost:5000/api/recipe').subscribe(
      (data) => {
        console.log('Fetched recipes:', data);
  
        // Map the fetched data to format ingredients properly
        this.recipes = data.map((recipe) => ({
          ...recipe,
          ingredients:
            recipe.ingredients && recipe.ingredients.length > 0
              ? recipe.ingredients.map((ingredient: any) =>
                  ingredient.productModel ? ingredient.productModel.name : 'Unknown'
                ) // Extract ingredient names from productModel
              : ['Brak składników'], // Default message for recipes without ingredients
        }));
  
        this.dataSource.data = this.recipes; // Update the data source for the table
        this.snackBar.open('Przepisy zostały załadowane.', 'OK', { duration: 3000 });
      },
      (error) => {
        console.error('Error fetching recipes:', error);
        this.snackBar.open('Nie udało się pobrać przepisów. Sprawdź połączenie z serwerem.', 'OK', {
          duration: 3000,
        });
      }
    );
  }
  


  addRecipe() {
    if (!this.newRecipe.name.trim() || !this.newRecipe.ingredients.trim()) {
      alert('Uzupełnij wszystkie pola przed dodaniem przepisu!');
      return;
    }
  
    const ingredientsArray = this.newRecipe.ingredients
      .split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient); // Removes empty strings
  
    const recipeToAdd = {
      name: this.newRecipe.name.trim(),
      ingredients: ingredientsArray
    };
  
    console.log('Sending recipe to backend:', recipeToAdd);
  
    this.http.post<any>('http://localhost:5000/api/recipe', recipeToAdd).subscribe(
      response => {
        console.log('Recipe added successfully:', response);
        this.recipes.push(response);
        this.dataSource.data = [...this.recipes];
        this.newRecipe = { name: '', ingredients: '' };
        this.showDialog = false;
        this.snackBar.open('Przepis dodany pomyślnie!', 'OK', { duration: 3000 });
      },
      error => {
        console.error('Error adding recipe:', error);
        alert('Wystąpił błąd podczas dodawania przepisu. Sprawdź serwer.');
      }
    );
  }
  

  private formatIngredients(ingredients: string): string[] {
    return ingredients
      .split(',')
      .map((item) => item.trim()) // Remove whitespace
      .filter((item) => item); // Remove empty entries
  }

  onSearch() {
    const searchTermLower = this.searchTerm.trim().toLowerCase();
    this.dataSource.filter = searchTermLower;
    this.dataSource.filterPredicate = (data: Recipe, filter: string) => {
      return data.name.toLowerCase().includes(filter);
    };
  }


  resetSearch() {
    this.searchTerm = '';
    this.dataSource.filter = '';
  }

  deleteRecipe(recipe: Recipe) {
    if (confirm('Czy na pewno chcesz usunąć ten przepis?')) {
      this.http.delete(`http://localhost:5000/api/recipe/${recipe.id}`).subscribe(
        () => {
          this.recipes = this.recipes.filter((r) => r.id !== recipe.id);
          this.dataSource.data = this.recipes;
          this.snackBar.open('Przepis został usunięty.', 'OK', { duration: 3000 });
        },
        (error) => {
          console.error('Error deleting recipe:', error);
          alert('Wystąpił błąd podczas usuwania przepisu.');
        }
      );
    }
  }
}
