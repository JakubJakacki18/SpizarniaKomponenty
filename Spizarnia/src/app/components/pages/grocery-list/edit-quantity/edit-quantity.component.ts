import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListOfProductsToBuy } from '../../../../../../../Spizarnia-backend/src/models/ListOfProductsToBuy';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-quantity',
  imports: [MatFormFieldModule, FormsModule],
  templateUrl: './edit-quantity.component.html',
  styleUrl: './edit-quantity.component.css'
})
export class EditQuantityComponent {
  constructor(
    public dialogRef: MatDialogRef<EditQuantityComponent>, 
    @Inject(MAT_DIALOG_DATA) public productOnList: ListOfProductsToBuy
  ) 
  {
    console.log(productOnList); 
    this.newQuantity = productOnList.quantity;
  }
  newQuantity: number;
  onConfirm(): void {
    this.dialogRef.close(this.newQuantity);
  }

  onCancel(): void {
    this.dialogRef.close(-1);
  }
}