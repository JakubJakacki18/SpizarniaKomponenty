import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { Product } from '../../../../../../Spizarnia-backend/src/models/Product';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { SnackBarResultType } from '../../../shared/constances/additional.types';
import { DialogService } from '../../../services/dialog.service';


@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatSortModule, RouterModule],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  providers: [DatePipe]
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'quantity', 'categoryName', 'purchaseDate', 'expirationDate', 'delete'];
  searchTerm: string = '';
  dataSource = new MatTableDataSource<any>([]); 
  @ViewChild(MatSort) sort!: MatSort; 

  constructor(private http: HttpClient, private datePipe: DatePipe,private productService : ProductService,private snackBarService : SnackBarService, private dialogService : DialogService) { }
  private checkExpirationInterval: any;

  ngOnInit() {
    this.getAllProducts()
    this.checkExpirationInterval = setInterval(() => {
      this.checkExpirationDates();
    }, 60000); // 60000 ms = 1 minuta
  }
  ngOnDestroy() {
    if (this.checkExpirationInterval) {
      clearInterval(this.checkExpirationInterval);
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onSearch() {
    if (this.searchTerm.length >= 2) {
      const searchTermLower = this.searchTerm.toLowerCase();

      this.dataSource.filter = searchTermLower;
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        return data.name.toLowerCase().includes(filter);
      };
    } else {
      this.dataSource.filter = '';
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
        color: '#f44336',
        fontWeight: 'bold'
      };
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
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.dataSource.data = data;
      },
      error: (error) => {
        this.snackBarService.openSnackBar('Błąd podczas pobierania produktów', SnackBarResultType.Error);
        console.error("Error!", error);
      }
  });
  }
  
  async deleteProduct(productId: number) {
    const deleteProductDialogData: { title: string; message: string; } = {
      title: 'Usuwanie produktu',
      message: 'Czy na pewno chcesz usunąć ten produkt?'
    }
    const dialogAnswer= await this.dialogService.openConfirmDialog(deleteProductDialogData);
    if (dialogAnswer) {
      this.productService.deleteProductById(productId).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== productId);
          this.dataSource.data = this.products;
        },
        error: (error) => {
          this.snackBarService.openSnackBar('Nie udało się usunąć produktu', SnackBarResultType.Error);
          console.error('Błąd podczas usuwania produktu:', error);
        }
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
      //console.warn('Service Worker nie jest dostępny w tej przeglądarce.');
    }
  }

  searchProducts(name: string): Observable<any> {
    return this.http.get<any[]>(`http://localhost:5000/api/product?name=${name}`);
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') ?? '';
  }
}
