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
import { AddRecipeComponent } from "./add-recipe/add-recipe.component";

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatSortModule, MatSnackBarModule, AddRecipeComponent],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipes: any[] = [];
  newRecipe = { name: '', ingredients: '' };
  displayedColumns: string[] = ['name', 'ingredients', 'actions'];
  searchTerm: string = '';
  dataSource = new MatTableDataSource<any>([]);
  showDialog: boolean = false;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getAllRecipes();
    this.dataSource.sort = this.sort;
  }

  getAllRecipes() {
    this.http.get<any[]>('http://localhost:5000/api/recipe').subscribe(
      (data) => {
        this.recipes = data;
        this.dataSource.data = data;
        console.log('Fetched recipes:', data);
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
    if (!this.newRecipe.name || !this.newRecipe.ingredients.trim()) {
      alert('Uzupełnij wszystkie pola przed dodaniem przepisu!');
      return;
    }

    const ingredientsArray = this.newRecipe.ingredients.split(',').map((item) => item.trim());
    const recipeToAdd = {
      name: this.newRecipe.name,
      ingredients: ingredientsArray,
    };

    this.http.post<any>('http://localhost:5000/api/recipe', recipeToAdd).subscribe(
      (response) => {
        this.recipes.push(response);
        this.dataSource.data = [...this.recipes];
        this.newRecipe = { name: '', ingredients: '' };
        this.showDialog = false; // Ukryj formularz po dodaniu przepisu
      },
      (error) => {
        console.error('Error adding recipe:', error);
        if (error.error && error.error.message) {
          alert(`Error: ${error.error.message}`);
        } else {
          alert('Wystąpił błąd podczas dodawania przepisu. Sprawdź serwer.');
        }
      }
    );
  }

  onSearch() {
    const searchTermLower = this.searchTerm.trim().toLowerCase();
    this.dataSource.filter = searchTermLower;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return (
        data.name.toLowerCase().includes(filter) ||
        data.ingredients.some((ingredient: string) =>
          ingredient.toLowerCase().includes(filter)
        )
      );
    };
  }

  resetSearch() {
    this.searchTerm = '';
    this.dataSource.filter = '';
  }

  deleteRecipe(recipe: any) {
    if (confirm('Czy na pewno chcesz usunąć ten przepis?')) {
      this.http.delete(`http://localhost:5000/api/recipe/${recipe.id}`).subscribe(
        () => {
          this.recipes = this.recipes.filter((r) => r.id !== recipe.id);
          this.dataSource.data = this.recipes;
        },
        (error) => {
          console.error('Error deleting recipe:', error);
        }
      );
    }
  }
}
