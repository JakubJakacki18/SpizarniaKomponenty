import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../../../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion'
@Component({
  selector: 'app-add-category',
  imports: [    MatButtonModule,
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

  constructor(private fb: FormBuilder, private categoryService : CategoryService) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
    this.categoryService.createNewCategory(this.categoryForm.value).subscribe(
    (response) => {
      console.log('Kategoria została utworzona:', response);
    },
    (error) => {
      console.error('Błąd podczas tworzenia kategorii:', error);
    }
   );
   } else {
      console.log('Formularz jest nieprawidłowy');
   }
   }

  }
