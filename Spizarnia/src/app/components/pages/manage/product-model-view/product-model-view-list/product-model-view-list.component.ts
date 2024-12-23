import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { ProductModelService } from './../../../../../services/product-model.service'; // Import serwisu
import { MatDialog } from '@angular/material/dialog';
import { ProductModelEditDialogComponent } from '../../../../partials/product-model-edit-dialog/product-model-edit-dialog.component';  // Correct path
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-model-view-list',
  standalone: true,
  imports: [
 MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    FormsModule
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

  constructor(private productModelService: ProductModelService, private http: HttpClient, private dialog: MatDialog) {}

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
      this.dataSource.data = data;
      console.log('Pobrano dane:', data);
    },
    error: (err) => {
      console.error('Błąd podczas pobierania modeli produktów:', err);
      alert('Błąd podczas ładowania danych produktów.');
    },
  });
}

deleteProduct(productId: number) {
  if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
    this.http.delete(`http://localhost:5000/api/productModel/${productId}`).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== productId);
        this.dataSource.data = this.products;
      },
      (error) => {
        console.error('Błąd podczas usuwania produktu:', error);
        alert('Błąd podczas usuwania produktu.');
      }
    );
  }
}

updateProduct(updatedProduct: any) {
  this.http.put(`http://localhost:5000/api/productModel/${updatedProduct.id}`, updatedProduct).subscribe(
    (response) => {
      console.log('Produkt zaktualizowany:', response);
      this.loadProductModels(); // Refresh the list after update
    },
    (error) => {
      console.error('Błąd podczas aktualizacji produktu:', error);
      alert('Błąd podczas aktualizacji produktu.');
    }
  );
}


  // Edycja produktu
  editProduct(product: any): void {
  const dialogRef = this.dialog.open(ProductModelEditDialogComponent, {
    width: '400px',
    data: {
      price: product.price.toString(),
      category: product.category.categoryName,
      type: product.type
    }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      const updatedProduct = { ...product, ...result };
      this.updateProduct(updatedProduct);
    }
  });
}

  
}
