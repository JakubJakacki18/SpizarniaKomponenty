import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModelService } from './../../../../../services/product-model.service'; // Serwis do wysyłania danych
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-model-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-model-form.component.html',
  styleUrl: './product-model-form.component.css'
})
export class ProductModelFormComponent {
  productForm: any= undefined;  // Deklaracja formularza

  constructor(private fb: FormBuilder, private productModelService: ProductModelService) { }

  ngOnInit(): void {
    // Inicjalizacja formularza
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      unit: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }
    onSubmit() {
      if (this.productForm.valid) {
        // Wywołanie metody serwisu do wysyłania danych
        this.productModelService.createProduct(this.productForm.value).subscribe(
          (response) => {
            console.log('Produkt został utworzony:', response);
          },
          (error) => {
            console.error('Błąd podczas tworzenia produktu:', error);
          }
        );
      } else {
        console.log('Formularz jest nieprawidłowy');
      }
  }
}
