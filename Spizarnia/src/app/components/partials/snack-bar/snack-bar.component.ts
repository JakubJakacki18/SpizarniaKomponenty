import { Component, Inject, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
@Component({
  selector: 'app-snack-bar',
  imports: [MatButtonModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.css'
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
  snackBarRef = inject(MatSnackBarRef);
}
