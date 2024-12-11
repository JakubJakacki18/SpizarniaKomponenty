import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Dodano HttpClient

@Component({
  selector: 'app-grocery-list-view',
  standalone: true,
  imports: [MatTableModule, HttpClientModule, MatSortModule, CommonModule, FormsModule],
  templateUrl: './grocery-list-view.component.html',
  styleUrls: ['./grocery-list-view.component.css'],
  providers: [DatePipe],
})
export class GroceryListViewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'quantity', 'categoryName', 'price', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]); // Table data
  totalPrice: number = 0;  // Variable to hold the total price

  @ViewChild(MatSort) sort!: MatSort; // Sorting functionality

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadExpiredProducts();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Sorting after view initialization
  }

  // Loading expired products and calculating total price
  loadExpiredProducts() {
    this.http.get<any[]>(`http://localhost:5000/api/product`).subscribe(
      (data) => {
        const currentDate = new Date();
        const expiredProducts = data.filter((product) => {
          const expirationDate = new Date(product.expirationDate);
          return expirationDate.getTime() < currentDate.getTime(); // Filter expired products
        });

        this.dataSource.data = expiredProducts; // Assign expired products to the dataSource

        // Calculate the total price
        this.totalPrice = expiredProducts.reduce((sum, product) => sum + (product.price || 0), 0);

        console.log('Przeterminowane produkty:', expiredProducts);
        console.log('Suma cen produktów:', this.totalPrice);
      },
      (error) => {
        console.error('Błąd podczas pobierania produktów:', error);
      }
    );
  }

  // Edit product (for your requirements)
  editProduct(product: any): void {
    console.log('Edycja produktu:', product);
    // You can open an edit form or redirect the user here
  }

  // Delete product
  deleteProduct(productId: number) {
    if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      this.http.delete(`http://localhost:5000/api/product/${productId}`).subscribe(
        () => {
          this.dataSource.data = this.dataSource.data.filter((product) => product.id !== productId);
          console.log(`Produkt o ID ${productId} został usunięty.`);
        },
        (error) => {
          console.error('Błąd podczas usuwania produktu:', error);
        }
      );
    }
  }
}
