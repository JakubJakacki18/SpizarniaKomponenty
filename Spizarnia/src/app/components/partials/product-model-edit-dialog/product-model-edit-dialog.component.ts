import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Ensure FormsModule is imported
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-model-edit-dialog',
  standalone: true,
  templateUrl: './product-model-edit-dialog.component.html',
  styleUrls: ['./product-model-edit-dialog.component.css'],
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatButtonModule,MatInputModule],  // Ensure these are modules, not components
})
export class ProductModelEditDialogComponent {
  updatedPrice: string;  // Price as string for binding with input
  updatedCategory: string;
  updatedType: string;

  constructor(
    public dialogRef: MatDialogRef<ProductModelEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updatedPrice = data.price;
    this.updatedCategory = data.category;
    this.updatedType = data.type;
  }

  onSave(): void {
    const updateProduct = {
      price: parseFloat(this.updatedPrice),  
      category: this.updatedCategory,
      type: this.updatedType
    };

    this.dialogRef.close(updateProduct);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
