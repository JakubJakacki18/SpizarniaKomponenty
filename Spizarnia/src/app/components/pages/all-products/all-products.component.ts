import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { Product } from '../../../shared/models/Product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatSortModule],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  providers: [DatePipe]
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'quantity', 'categoryName', 'purchaseDate', 'expirationDate', 'delete'];
  searchTerm: string = '';
  dataSource = new MatTableDataSource<any>([]); // Użycie MatTableDataSource dla sortowania
  @ViewChild(MatSort) sort!: MatSort; // Dodanie ViewChild do obsługi sortowania

  constructor(private http: HttpClient, private datePipe: DatePipe) { }
  private checkExpirationInterval: any;

  ngOnInit() {
    this.getAllProducts()
    this.checkExpirationInterval = setInterval(() => {
      this.checkExpirationDates();
    }, 60000); // 60000 ms = 1 minuta
  }
  ngOnDestroy() {
    // Czyść interwał przy niszczeniu komponentu
    if (this.checkExpirationInterval) {
      clearInterval(this.checkExpirationInterval);
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Ustawienie sortowania po inicjalizacji widoku
  }

  onSearch() {
    if (this.searchTerm.length >= 2) {
      const searchTermLower = this.searchTerm.toLowerCase();

      this.dataSource.filter = searchTermLower; // Użycie wbudowanego filtrowania w MatTableDataSource
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        return data.name.toLowerCase().includes(filter); // Wyszukiwanie po nazwie
      };
    } else {
      this.dataSource.filter = ''; // Reset filtra
    }
  }
  getRowStyle(product: any): any {
    const currentDate = new Date();
    const expirationDate = new Date(product.expirationDate);

    // Obliczenie różnicy dni
    const timeDifference = expirationDate.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    // Jeśli data ważności jest mniejsza niż 3 dni, zmieniamy styl wiersza
    if (daysDifference <= 3 && daysDifference > 0) {
      return {
        color: 'red',
        fontWeight: 'bold'
      }; // Kolor czerwony dla produktów, których data ważności zbliża się
    }
    if (daysDifference < 7 && daysDifference > 3) {
      return {
        color: 'yellow',
        fontWeight: 'bold'
      };
    }
    if (daysDifference <= 0) {
      return {
        color: 'gray',
        textDecoration: 'line-through' 
      };
    }

    return {};
  }

  getAllProducts() {
    this.http.get<any[]>(`http://localhost:5000/api/product`).subscribe(
      (data) => {
        this.products = data;
        this.dataSource.data = data; // Przekazanie danych do MatTableDataSource
      },
      (error) => {
        console.error("Error!", error);
      }
    )
  }
  deleteProduct(productId: number) {
    if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      this.http.delete(`http://localhost:5000/api/product/${productId}`).subscribe(
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

  checkExpirationDates() {
    const currentDate = new Date();
    const expiringProducts: Product[] = [];

    this.products.forEach((product) => {
      if (product.expirationDate) {
        const expirationDate = new Date(product.expirationDate);
        const timeDifference = expirationDate.getTime() - currentDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        if (daysDifference <= 3 && daysDifference > 0) { //3 dni - można dostosować.
          expiringProducts.push(product);
        }
      }
    });

    if (expiringProducts.length > 0) {
      this.sendExpirationNotification(expiringProducts);
    }
  }

  sendExpirationNotification(products: any[]) {
    const productNames = products.slice(0, 5).map(product => product.name).join(', ');
    //Jesli jest wiecej niz 5 to nie wyswietlamy.
    const moreProductsText = products.length > 5 ? `i ${products.length - 5} innych produktów...` : '';

    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          const notificationTitle = `Zbliża się termin ważności produktów`;
          const notificationBody = `Produkty: ${productNames} mają datę ważności za 3 dni! ${moreProductsText}`;
          console.log(`Produkty: ${productNames} mają datę ważności za 3 dni! ${moreProductsText}`);
          registration.showNotification(notificationTitle, {
            body: notificationBody,
            tag: 'expiration-notification',
          });
        })
        .catch((err) => console.error('Błąd podczas wyzwalania powiadomienia:', err));
    } else {
      console.warn('Service Worker nie jest dostępny w tej przeglądarce.');
    }
  }

  searchProducts(name: string): Observable<any> {
    return this.http.get<any[]>(`http://localhost:5000/api/product?name=${name}`);
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') ?? '';
  }
}
