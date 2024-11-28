import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../../shared/models/ProductModel';
import { ProductModelService } from '../../../../services/product-model.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-product-model',
  imports: [CommonModule],
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
