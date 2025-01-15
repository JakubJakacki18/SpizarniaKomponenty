import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion'
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SnackBarResultType } from '../../../../../shared/constances/additional.types';
import { SnackBarService } from '../../../../../services/snack-bar.service';


@Component({
  selector: 'app-add-category',
  imports: [    MatButtonModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{
  categoryForm!: FormGroup; // Zmienna formularza
  
  constructor(private fb: FormBuilder, private categoryService : CategoryService, private dialog: MatDialog, private snackBarService: SnackBarService) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
    });
  }

  onSubmit() {
    let snackBarMessage : string;
    if (this.categoryForm.valid) {
    this.categoryService.createNewCategory(this.categoryForm.value).subscribe({
    next: (response) => {
      console.log('Kategoria została utworzona:', response);
      this.categoryForm.reset();
      snackBarMessage = 'Kategoria została utworzona pomyślnie'
      this.snackBarService.openSnackBar(snackBarMessage, SnackBarResultType.Success);
    },
    error: (error) => {
      if (error.status ===409)
          snackBarMessage='Kategoria nie została utworzona pomyślnie. Dana kategoria już istnieje w spiżarni'
        else
          snackBarMessage='Kategoria nie została utworzona pomyślnie. Coś poszło nie tak, spróbuj jeszcze raz'
      this.snackBarService.openSnackBar(snackBarMessage, SnackBarResultType.Error);
      console.error('Błąd podczas tworzenia kategorii:', error);
    }
    });
   } else {
    snackBarMessage ='Formularz jest nieprawidłowy, Wpisz nazwę kategorii którą chcesz dodać.'
    this.snackBarService.openSnackBar(snackBarMessage, SnackBarResultType.Error);
      console.log('Formularz jest nieprawidłowy');
   }
   
   }
  }
