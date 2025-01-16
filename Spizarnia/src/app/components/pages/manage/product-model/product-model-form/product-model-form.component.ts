import { CategoryService } from './../../../../../services/category.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModelService } from './../../../../../services/product-model.service'; // Serwis do wysyłania danych
import { CommonModule } from '@angular/common';
import { Category } from '../../../../../../../../Spizarnia-backend/src/models/Category';
import { first } from 'rxjs';
import { SnackBarService } from '../../../../../services/snack-bar.service';
import { SnackBarResultType } from '../../../../../shared/constances/additional.types';

@Component({
 selector: 'app-product-model-form',
 imports: [ReactiveFormsModule, CommonModule],
 templateUrl: './product-model-form.component.html',
 styleUrl: './product-model-form.component.css'
})
export class ProductModelFormComponent {
 productForm: any;  // Deklaracja formularza
 @Output() productCreated = new EventEmitter<void>();
 categories: Category[] =[];
 categoriesControl = new FormControl();
 constructor(private fb: FormBuilder, private productModelService: ProductModelService, private categoryService: CategoryService, private snackBarService : SnackBarService) 
 {
  this.productForm = new FormGroup({
    categories: this.categoriesControl,
  });
 }

ngOnInit(): void {
  this.fetchCategories();
  this.productForm = this.fb.group({
  name: ['', Validators.required],
  unit: ['', Validators.required],
  price: ['', [Validators.required, Validators.min(0)]],
  quantity: ['', [Validators.required, Validators.min(0.001)]],
  categoryId: ['',[Validators.required]],
  type: []
  });
}
onSubmit() {
  if (this.productForm.valid) {
    //Akceptujemy ta sama nazwe jesli pozostale parametry sa inne
    //Kategoria bez znaczenia
    const productToCheck = {
      name: this.productForm.get('name').value,
      unit: this.productForm.get('unit').value,
      price: this.productForm.get('price').value,
      quantity: this.productForm.get('quantity').value
    };

  // Wywołanie metody serwisu  do wysyłania danych
  this.productModelService.checkDuplicateProduct(productToCheck)
  .pipe(first())
  .subscribe({
    next: (isDuplicate) => {
      if (isDuplicate) {
        this.snackBarService.openSnackBar('Produkt o tych samych parametrach już istnieje!', SnackBarResultType.Error);
      } else {
        this.productModelService.createProduct(this.productForm.value).subscribe({
          next: (response) => {
            console.log('Produkt został utworzony:', response);
            this.snackBarService.openSnackBar('Produkt został utworzony pomyślnie!', SnackBarResultType.Success);
            this.productCreated.emit();
            this.productForm.reset();
          },
          error: (error) => {
            console.error('Błąd podczas tworzenia produktu:', error);
            this.snackBarService.openSnackBar('Błąd podczas tworzenia produktu.', SnackBarResultType.Error);
          }
        });
      }
    },
    error: (error) => {
      console.error('Błąd podczas sprawdzania duplikatów:', error);
      this.snackBarService.openSnackBar('Błąd podczas sprawdzania duplikatów:',SnackBarResultType.Error)
    }
  });
} else {
  //"keys" wyciaga same nazwy kluczy z formularza
  //"mark as touched" używa się do pokazania błędów
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control.markAsTouched();
    });
    this.snackBarService.openSnackBar('Przynajmniej jedno z wymaganych pól jest puste. Wypełnij wszystkie pola', SnackBarResultType.Error);
    console.log('Formularz jest nieprawidłowy');
    }
}
 fetchCategories(): void {
  this.categoryService.getAllCategories().subscribe({
    next: (data) => (this.categories = data),
    error: (err) => {
      console.error('Error fetching ProductModels:', err)
      this.snackBarService.openSnackBar('Nie udało się pobrać kategorii', SnackBarResultType.Error);
      
    }
  });
}
}
