import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';  // Dodajemy ten import
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';
import { Product } from '../../../shared/models/Product';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatSortModule,],  // Dodajemy CommonModule do imports
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  providers: [DatePipe]  // Zapewniamy dostęp do DatePipe
})
export class AllProductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'quantity', 'category', 'purchaseDate', 'expirationDate'];
  searchTerm: string = '';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }
  private checkExpirationInterval: any;

  ngOnInit(){
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
  

  onSearch(){
    if(this.searchTerm.length >= 3){

      this.filteredProducts = this.products.filter((product) => {
        const searchTermLower = this.searchTerm.toLowerCase(); //żeby uniknąć błędów

        return(
          product.name.toLowerCase().includes(searchTermLower)
          //opcjonalnie można analogicznie dodać wyszukiwanie po datach, ilości, jednostkach
        )
      })

    }else{
      this.filteredProducts = this.products;
    }
  }

  getAllProducts(){
    this.http.get<any[]>(`http://localhost:5000/api/product`).subscribe(
      (data)=>{
        this.products = data;
        this.filteredProducts = data;
      },
      (error)=>{
        console.error("Error!", error);
      }
    )
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

    if ('serviceWorker' in navigator) {
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
      console.error('Service Worker nie jest dostępny w tej przeglądarce.');
    }
  }

  searchProducts(name: string): Observable<any>{
    return this.http.get<any[]>(`http://localhost:5000/api/product?name=${name}`)
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') ?? '';
  }
}
