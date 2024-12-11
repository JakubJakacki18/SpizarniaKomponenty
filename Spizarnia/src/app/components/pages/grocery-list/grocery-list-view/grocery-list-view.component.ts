import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-grocery-list-view',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule, FormsModule],
  templateUrl: './grocery-list-view.component.html',
  styleUrls: ['./grocery-list-view.component.css'],
  providers: [DatePipe],
})
export class GroceryListViewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'quantity', 'categoryName', 'price', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]); // Dane do tabeli
  @ViewChild(MatSort) sort!: MatSort; // Obsługa sortowania

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loadExpiredProducts(); // Pobranie produktów na starcie
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort; // Przypisanie sortowania do tabeli
    }
  }

  // Pobranie i filtrowanie produktów, których data ważności się skończyła
  loadExpiredProducts(): void {
    const products = this.getMockProducts(); // Zastąp mock API prawdziwym
    const today = new Date(); // Dzisiejsza data

    // Filtruj produkty, których data ważności już minęła
    const expiredProducts = products.filter((product) => {
      const expiredDate = new Date(product.expiryDate); // Parsuj datę ważności
      return expiredDate < today; // Sprawdź, czy data ważności minęła
    });

    // Przypisanie przeterminowanych produktów do tabeli
    this.dataSource.data = expiredProducts;
    console.log('Przeterminowane produkty:', expiredProducts); // Logowanie w konsoli
  }

  // Usuwanie produktu
  deleteProduct(productId: number): void {
    console.log('Usuwanie produktu:', productId);
  }

  // Edycja produktu (dostosuj do swoich potrzeb)
  editProduct(product: any): void {
    console.log('Edycja produktu:', product);
    // Tutaj możesz otworzyć formularz edycji lub przekierować użytkownika
  }

  // Mock danych (zastąp to prawdziwym API)
  getMockProducts(): any[] {
    return [
      { id: 1, name: 'Mleko', quantity: 2, unit: 'litry', categoryName: 'Nabiał', price: 4.99, expiryDate: '2023-12-01' },
      { id: 2, name: 'Chleb', quantity: 1, unit: 'sztuka', categoryName: 'Pieczywo', price: 3.49, expiryDate: '2023-12-12' },
      { id: 3, name: 'Masło', quantity: 1, unit: 'kostka', categoryName: 'Nabiał', price: 6.99, expiryDate: '2023-11-30' },
    ];
  }
}
