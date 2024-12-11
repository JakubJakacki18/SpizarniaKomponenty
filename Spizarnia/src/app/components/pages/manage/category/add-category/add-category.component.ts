import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion'
import { SimpleDialogComponent } from '../../../../partials/simple-dialog/simple-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-add-category',
  imports: [    MatButtonModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{
  categoryForm!: FormGroup; // Zmienna formularza

  constructor(private fb: FormBuilder, private categoryService : CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
    });
  }

  onSubmit() {
    let dataDialog : {title : string, message : string};
    if (this.categoryForm.valid) {
    this.categoryService.createNewCategory(this.categoryForm.value).subscribe(
    (response) => {
      console.log('Kategoria została utworzona:', response);
      this.categoryForm.reset();
      dataDialog= {
        title: 'Sukces',
        message: 'Kategoria została utworzona pomyślnie'
      }
      this.dialog.open(SimpleDialogComponent, {data: dataDialog});
    },
    (error) => {
      if (error.status ===409)
        {
          dataDialog= {
            title: 'Błąd',
            message: 'Kategoria nie została utworzona pomyślnie. Dana kategoria już istnieje w spiżarni'
          }
        }else{
          dataDialog= {
            title: 'Błąd',
            message: 'Kategoria nie została utworzona pomyślnie. Coś poszło nie tak, spróbuj jeszcze raz'
      }}

      this.dialog.open(SimpleDialogComponent, {data: dataDialog});
      console.error('Błąd podczas tworzenia kategorii:', error);
    }
   );
   } else {
    dataDialog= {
      title: 'Błąd',
      message: 'Formularz jest nieprawidłowy, Wpisz nazwę kategorii którą chcesz dodać.'
    }
    this.dialog.open(SimpleDialogComponent, {data: dataDialog});
      console.log('Formularz jest nieprawidłowy');
   }
   }
  }
