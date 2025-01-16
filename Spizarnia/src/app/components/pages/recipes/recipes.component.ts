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
import { RecipeService } from '../../../services/recipe.service';
import { error } from 'console';
import { DialogService } from '../../../services/dialog.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { Recipe } from '../../../../../../Spizarnia-backend/src/models/Recipe';
import { ProductService } from '../../../services/product.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { RouterModule } from '@angular/router';
import { SnackBarService } from '../../../services/snack-bar.service';
import { SnackBarResultType } from '../../../shared/constances/additional.types';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatSortModule, MatSnackBarModule, MatExpansionModule, RouterModule],
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
  recipeStyles: { [key: number]: any } = {};
  constructor(private http: HttpClient, private snackBarService: SnackBarService, private recipeService : RecipeService, private dialogService: DialogService, private productService : ProductService) {
    
  }

  async ngOnInit() {
    this.getAllRecipes();
    
    this.dataSource.sort = this.sort;
    
  }
  //Aktualnie bez komunikacji z Backendem TODO
  getAllRecipes() {
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.dataSource.data = data;
        this.setRecipeStyles();
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
        this.snackBarService.openSnackBar('Nie udało się pobrać przepisów',SnackBarResultType.Error);


        // this.snackBar.open('Nie udało się pobrać przepisów. Sprawdź połączenie z serwerem.', 'OK', {
        //   duration: 3000,
        // });
      }}
    );
    
  }

  addRecipe() {
    //Można tutaj ew. przekierować do manage-recipe albo wywalić 



    // if (!this.newRecipe.name || !this.newRecipe.ingredients.trim()) {
    //   alert('Uzupełnij wszystkie pola przed dodaniem przepisu!');
    //   return;
    // }

    // const ingredientsArray = this.newRecipe.ingredients.split(',').map((item) => item.trim());
    // const recipeToAdd = {
    //   name: this.newRecipe.name,
    //   ingredients: ingredientsArray,
    // };
    // this.recipes.push(recipeToAdd);
    // this.dataSource.data = [...this.recipes];
    
    // localStorage.setItem('recipes', JSON.stringify(this.recipes));

    // this.newRecipe = { name: '', ingredients: '' };
    // this.showDialog = false;
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
    //Trzeba zrobić usuwanie przepisu z backendu
    const dialogMessage = {title: 'Usuwanie przepisu', message: 'Czy na pewno chcesz usunąć ten przepis?'};
    const dialogAnswer =this.dialogService.openConfirmDialog(dialogMessage);
      if (!dialogAnswer) return;
    //this.recipeService.deleteRecipe(recipe.id).subscribe({});
  }
  async getAccordionStyle(recipe: Recipe)
  {
    const isExecutable = await this.isRecipeExecutable(recipe);
  return {
    style: isExecutable
      ? {
          background: 'lightgreen',
          fontWeight: 'bold'
      }
      : {
        background: 'red',
      },
    isExecutable,
  };
  }
  async isRecipeExecutable(recipe: Recipe)
  {
    for (const ingredient of recipe.ingredients ?? []) {
      const productModelId = ingredient.productModel?.id ?? -1;
      try {
      const quantityOfProductModel = await firstValueFrom(this.productService.getQuantityOfProducts(productModelId));
      if(ingredient.quantity>quantityOfProductModel)
        return false;
    } catch (err) {
      console.error("Nie udało się sprawdzić ilości produktu w spiżarni", err);
      //this.snackBarService.openSnackBar('Nie udało sprawdzić ilości produktu w spiżarni',SnackBarResultType.Error);
      return false; 
    }  
    }
    return true;
  }


  async setRecipeStyles() {
    for (const recipe of this.dataSource.data ?? []) {
      const style = await this.getAccordionStyle(recipe);
      this.recipeStyles[recipe.id] = style; 
    }
  }
 executeRecipe(recipe : Recipe){
  
 } 
}
