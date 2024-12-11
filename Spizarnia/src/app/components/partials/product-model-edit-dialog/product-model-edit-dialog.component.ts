import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Ensure FormsModule is imported

@Component({
  selector: 'app-product-model-edit-dialog',
  standalone: true,
  templateUrl: './product-model-edit-dialog.component.html',
  styleUrls: ['./product-model-edit-dialog.component.css'],
  imports: [CommonModule, MatFormFieldModule, FormsModule],  // Ensure these are modules, not components
})
export class ProductModelEditDialogComponent {
  updatedPrice: string;  // Price as string for binding with input
  updatedCategory: string;
  updatedType: string;

  constructor(
    public dialogRef: MatDialogRef<ProductModelEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize fields with the data passed from the parent component
    this.updatedPrice = data.price;
    this.updatedCategory = data.category;
    this.updatedType = data.type;
  }

  onSave(): void {
    // Convert price to a number before sending it back to the parent
    const updateProduct = {
      price: parseFloat(this.updatedPrice),  // Ensure price is a number
      category: this.updatedCategory,
      type: this.updatedType
    };

    // Pass updated data back to the parent
    this.dialogRef.close(updateProduct);
  }

  onCancel(): void {
    // Close the dialog without sending any data
    this.dialogRef.close();
  }
}
