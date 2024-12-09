import { CategoryService } from './../../../../../services/category.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModelService } from './../../../../../services/product-model.service'; // Serwis do wysyłania danych
import { CommonModule } from '@angular/common';
import { Category } from '../../../../../../../../Spizarnia-backend/src/models/Category';

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
 constructor(private fb: FormBuilder, private productModelService: ProductModelService, private categoryService: CategoryService) 
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
  quantity: ['', [Validators.required, Validators.min(1)]],
  selectedCategory: ['',[Validators.required]],
  type: []
  });
}
onSubmit() {
  if (this.productForm.valid) {
  // Wywołanie metody serwisu  do wysyłania danych
  this.productModelService.createProduct(this.productForm.value).subscribe(
  (response) => {
    console.log('Produkt został utworzony:', response);
    this.productCreated.emit();
  },
  (error) => {
    console.error('Błąd podczas tworzenia produktu:', error);
  }
 );
 } else {
    console.log('Formularz jest nieprawidłowy');
 }
 }
 fetchCategories(): void {
  this.categoryService.getAllCategories().subscribe({
    next: (data) => (this.categories = data),
    error: (err) => console.error('Error fetching ProductModels:', err),
  });
}
}
