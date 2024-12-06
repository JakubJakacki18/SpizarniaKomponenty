import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';  // Dodajemy ten import
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Dodajemy CommonModule do imports
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
  providers: [DatePipe]  // Zapewniamy dostęp do DatePipe
})
export class AllProductsComponent {
  products = [
    { name: 'Mleko', quantity: 2, purchaseDate: new Date(2023, 10, 15), expirationDate: new Date(2023, 11, 15) },
    { name: 'Chleb', quantity: 1, purchaseDate: new Date(2023, 10, 20), expirationDate: new Date(2023, 11, 5) },
    { name: 'Masło', quantity: 1, purchaseDate: new Date(2023, 10, 10), expirationDate: new Date(2023, 11, 1) }
  ];

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  //Wyszukiwanie
  searchTerm: string = '';
  productModels: any[] = [] //tablica do trzymania wyników
  
  onSearch(){
    if(this.searchTerm.length >= 3){
      this.searchProducts(this.searchTerm).subscribe(
        (data) => {
          this.productModels = data;
          console.log("Wyniki: ", data)
        },
        (error) =>{
          console.error("Error: ", error);
        }
      );
    }else{
      this.productModels = [];
    }
  }

  searchProducts(name: string): Observable<any>{
    return this.http.get<any[]>(`http://localhost:5000/api/product?name=${name}`)
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') ?? '';
  }
}
