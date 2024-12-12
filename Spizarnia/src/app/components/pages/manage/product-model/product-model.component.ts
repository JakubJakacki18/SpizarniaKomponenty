import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../../../../../Spizarnia-backend/src/models/ProductModel';
import { ProductModelService } from '../../../../services/product-model.service';
import { CommonModule } from '@angular/common';
import { ProductModelFormComponent } from './product-model-form/product-model-form.component';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-product-model',
  imports: [CommonModule,ProductModelFormComponent, RouterModule],
  templateUrl: './product-model.component.html',
  styleUrl: './product-model.component.css',
})
export class ProductModelComponent implements OnInit {
  productModels: ProductModel[] = [];
  constructor(private productModelService: ProductModelService) {}
  //doczytuje dane z api po wygenerowaniu komponentu
  ngOnInit(): void {
    this.fetchProductModels();
}

fetchProductModels(): void {
  this.productModelService.getAllProductModels().subscribe({
    next: (data) => (this.productModels = data),
    error: (err) => console.error('Error fetching ProductModels:', err),
  });
}

}
