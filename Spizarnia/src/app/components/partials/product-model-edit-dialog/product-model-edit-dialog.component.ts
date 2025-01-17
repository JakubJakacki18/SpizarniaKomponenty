import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Ensure FormsModule is imported
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { response } from 'express';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { SnackBarResultType } from '../../../shared/constances/additional.types';
import { Category } from '../../../../../../Spizarnia-backend/src/models/Category';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-product-model-edit-dialog',
  standalone: true,
  templateUrl: './product-model-edit-dialog.component.html',
  styleUrls: ['./product-model-edit-dialog.component.css'],
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatButtonModule,MatInputModule,MatSelectModule],  // Ensure these are modules, not components
})
export class ProductModelEditDialogComponent {
  updatedPrice: string;  // Price as string for binding with input
  updatedCategory: string;
  updatedType: string;
  snackBarService: any;

  constructor(
    public dialogRef: MatDialogRef<ProductModelEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService : CategoryService
  ) {
    this.fetchCategories();
    this.updatedPrice = data.price;
    this.updatedCategory = data.categoryName;
    this.updatedType = data.type;
  }
  categories : Category[] = [];
  async fetchCategories()
  {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories=response;
        console.log("Pobieranie kategorii udało się",response);
      },
      error: (err) => {
        this.snackBarService.openSnackBar('Pobieranie kategorii nie powiodło się',SnackBarResultType.Error);
        console.error("Pobieranie kategorii nie udało się:",err);
      }
    });
  }
  onSave(): void {
    const updateProduct = {
      price: parseFloat(this.updatedPrice),  
      categoryName: this.updatedCategory,
      type: this.updatedType
    };

    this.dialogRef.close(updateProduct);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
