import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) {}
  onConfirm(): void {
    this.dialogRef.close(true);
}

  onCancel(): void {
    this.dialogRef.close(false);
}
}