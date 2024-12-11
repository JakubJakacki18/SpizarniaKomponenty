import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { ProductModelService } from './../../../../../services/product-model.service'; // Import serwisu

@Component({
  selector: 'app-product-model-view-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product-model-view-list.component.html',
  styleUrl: './product-model-view-list.component.css',
  providers: [DatePipe]
})
export class ProductModelViewListComponent implements OnInit {
  // Kolumny wyświetlane w tabeli
  displayedColumns: string[] = ['id', 'name', 'quantity', 'categoryName', 'type', 'price', 'edit', 'delete'];
  products: any[] = [];
  dataSource = new MatTableDataSource<any>([]); // Dane do tabeli
  @ViewChild(MatSort) sort!: MatSort; // Obsługa sortowania

  constructor(private productModelService: ProductModelService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProductModels(); // Pobranie produktów na starcie
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort; // Przypisanie sortowania do tabeli
    }
  }

  // Pobranie wszystkich modeli produktów z API
  loadProductModels(): void {
    this.productModelService.getAllProductModels().subscribe({
      next: (data) => {
        this.dataSource.data = data; // Przypisanie danych do tabeli
        console.log('Pobrano dane:', data); // Wypisanie danych w konsoli

      },
      error: (err) => console.error('Błąd podczas pobierania modeli produktów:', err),
    });
  }

  // Usuwanie produktModel - analogiczne jak product
  deleteProduct(productId: number) {
    if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      this.http.delete(`http://localhost:5000/api/productModel/${productId}`).subscribe(
        () => {
          this.products = this.products.filter(product => product.id !== productId);
          this.dataSource.data = this.products;
        },
        (error) => {
          console.error('Błąd podczas usuwania produktu:', error);
        }
      );
    }
  }

  // Edycja produktu
  editProduct(product: any): void {
   //Moze zmienic na jakis formularz?
    const updatedPrice = prompt('Podaj nową cenę produktu:', product.price.toString());
    const updatedCategory = prompt('Podaj nową kategorie produktu:', product.category.toString());
    const updatedType = prompt('Podaj nowy typ produktu:', product.type.toString());

    const updatedProduct = { ...product, price: updatedPrice, type: updatedType, categoryName: updatedCategory };
  
      this.http.put(`http://localhost:5000/api/productModel/${product.id}`, updatedProduct).subscribe(
        (response) => {
          console.log('Produkt zaktualizowany:', response);
          this.loadProductModels();
        },
        (error) => {
          console.error('Błąd podczas aktualizacji produktu:', error);
        }
      );
  }
  
}
