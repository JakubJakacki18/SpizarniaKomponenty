import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../../../../Spizarnia-backend/src/models/Category';

@Component({
  selector: 'app-add-recipe',
  imports: [MatDialogModule, MatInputModule,MatFormFieldModule, MatSelectModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
  //providers: [CategoryService]
})
export class AddRecipeComponent {
  categories: Category[] = [];
   constructor(public dialogRef: MatDialogRef<AddRecipeComponent>
    //,@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
    ) 
    {
      //this.fetchCategories();
    }
    addRecipeControl = new FormControl('');
    onSave(): void {
      this.dialogRef.close(true);
  }
  
    onCancel(): void {
      this.dialogRef.close(false);
  }
  addProductModel(): void {

  }
  ngOnInit(): void 
  {
    
  }
  // fetchCategories(): void 
  // {
  //   this.categoryService.getAllCategories().subscribe({
  //     next: (data) => (this.categories = data),
  //     error: (err) => console.error('Error fetching Categories:', err),
  //   });
  // }
}
