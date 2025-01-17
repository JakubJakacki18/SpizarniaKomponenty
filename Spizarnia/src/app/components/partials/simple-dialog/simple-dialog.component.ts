import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './simple-dialog.component.html',
  styleUrl: './simple-dialog.component.css'
})
export class SimpleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) {}
}
