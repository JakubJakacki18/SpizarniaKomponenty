import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Category } from '../../../../../../../Spizarnia-backend/src/models/Category';
import { MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../../services/category.service';
import { CommonModule } from '@angular/common';
import { elementAt } from 'rxjs';
import { DialogService } from '../../../../services/dialog.service';
import { ProductModel } from '../../../../../../../Spizarnia-backend/src/models/ProductModel';
import { CategoryWithDisabledProductModels } from '../../../../shared/constances/additional.types';

@Component({
  selector: 'app-recipe',
  imports: [ MatInputModule,MatFormFieldModule, MatSelectModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})


export class RecipeComponent {

   availableCategories: CategoryWithDisabledProductModels[]=[];
   recipeForm : FormGroup;
      constructor(private categoryService : CategoryService,private fb: FormBuilder, private dialogService : DialogService)
      {
        this.fetchCategories();
        this.recipeForm = this.fb.group({
          name: ['', Validators.minLength(3)],
          ingredients: this.fb.array([]),
          isFinished: [true]
        });
        this.addNewIngredientControlGroup();
      }
      createCategoriesWithIsDisabled(categories : Category[])
      {
        return categories.map(category => ({
          ...category,
          productModels: category.productModels?.map(productModel => ({
            ...productModel,
            isDisabled: false
          })) 
        }));
      }


      updateAvailableProducts() {
        const selectedProductModels = this.ingredients.controls
          .map(control => control.get('productId')?.value)
          .filter(value => value); // Tylko wybrane wartości
        console.log("selected",selectedProductModels);
        this.availableCategories.forEach(category => {
          category.productModels?.forEach(productModel => {
            const productModelWithIsDisabled = productModel as ProductModel & { isDisabled: boolean }
            if (selectedProductModels.some(selected => selected.id === productModel.id)) {
              productModelWithIsDisabled.isDisabled = true; 
            } else {
              productModelWithIsDisabled.isDisabled = false; 
            }
          });
        });
        console.log(this.availableCategories)
      }


      
    onSubmit(): void 
    {

    }
    get ingredients(): FormArray {
      return this.recipeForm.get('ingredients') as FormArray;
    }
    checkAllIngredientsFilled(): boolean {
      return this.ingredients.controls.every(control => !!control.value?.productId);
    }
    addProductModelToRecipe(event: { preventDefault: () => void; } /*parametr */): void 
    {
      //nie waliduje formularza po kliknięciu przycisku
      event.preventDefault();
      console.log(this.ingredients)
      if(!this.checkAllIngredientsFilled())
      {
        const dataDialog = {
          title: 'Dodawanie produktu',
          message: 'Aby dodać kolejny produkt wypełnij wszystkie pola "Składnik"'
         }
        this.dialogService.openSimpleDialog(dataDialog);
        return;
      }
      this.updateAvailableProducts();
      // this.ingredients.controls.forEach(control => {
      //   control.get('productId')?.disable(); // Wyłącza select
      // });
      this.addNewIngredientControlGroup();
      console.log(this.ingredients.controls)
    }
    addNewIngredientControlGroup()
    {
      const productGroup = this.fb.group({
        productId: [null, Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
      });
      this.ingredients.push(productGroup);
    }

    isSelectDisabled(index: number): boolean {
      if(index+1!==this.ingredients.length)
        return true;
      return false;
    }
    ngOnInit(): void 
    {
      
    }
    fetchCategories(): void 
    {
      this.categoryService.getAllCategories().subscribe({
        next: (data : Category[]) => 
          {
            this.availableCategories=this.createCategoriesWithIsDisabled(data);
          },
        error: (err) => console.error('Error fetching Categories:', err),
      });
    }
    removeProductModelFromReceipt(event: { preventDefault: () => void}, productModelToDelete:number) : void 
    {
      console.log(this.ingredients.length)
      event.preventDefault();
      // if(this.ingredients.length>1)
        this.ingredients.removeAt(productModelToDelete);
      this.updateAvailableProducts();

    }
}
