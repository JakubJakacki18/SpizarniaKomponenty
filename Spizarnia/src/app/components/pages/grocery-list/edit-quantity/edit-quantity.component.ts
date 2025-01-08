import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ListOfProductsToBuy } from '../../../../../../../Spizarnia-backend/src/models/ListOfProductsToBuy';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-quantity',
  imports: [MatFormFieldModule, FormsModule,MatDialogModule,MatInputModule],
  templateUrl: './edit-quantity.component.html',
  styleUrl: './edit-quantity.component.css'
})
export class EditQuantityComponent {
  constructor(
    public dialogRef: MatDialogRef<EditQuantityComponent>, 
    @Inject(MAT_DIALOG_DATA) public productOnList: ListOfProductsToBuy
  ) 
  {
    this.newQuantity = productOnList.quantity;
  }
  newQuantity: number;
  onConfirm(): void {
    this.dialogRef.close(this.newQuantity);
  }

  onCancel(): void {
    this.dialogRef.close(-1);
  }
  ngOnDestroy(): void {
    if (this.dialogRef) {
      this.dialogRef.close(-1);
    }
  }
}