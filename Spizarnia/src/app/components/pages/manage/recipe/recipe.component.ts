import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Category } from '../../../../../../../Spizarnia-backend/src/models/Category';
import { MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-recipe',
  imports: [ MatInputModule,MatFormFieldModule, MatSelectModule,FormsModule,ReactiveFormsModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
   categories: Category[] = [];
   recipeForm : FormGroup;
      constructor(private categoryService : CategoryService,private fb: FormBuilder)
      {
        this.fetchCategories();
        this.recipeForm = this.fb.group({
          name: ['', Validators.minLength(3)],
          ingredients: this.fb.array([]),
          isFinished: [true]
        });
      }
      
    onSubmit(): void 
    {

    }
    get ingredients(): FormArray {
      return this.recipeForm.get('ingredients') as FormArray;
    }
    addProductModelToRecipe(): void 
    {
      const productGroup = this.fb.group({
        productId: [null, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
      });
      this.ingredients.push(productGroup);
      console.log(this.ingredients)
      //this.recipeForm.


    
    }
    ngOnInit(): void 
    {
      
    }
    fetchCategories(): void 
    {
      this.categoryService.getAllCategories().subscribe({
        next: (data) => (this.categories = data),
        error: (err) => console.error('Error fetching Categories:', err),
      });
    }
}
