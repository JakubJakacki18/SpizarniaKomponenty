import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';  // Dodajemy ten import
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatSort, MatSortModule, SortDirection} from '@angular/material/sort';

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
  displayedColumns: string[] = ['id', 'name', 'quantity', 'purchaseDate', 'expirationDate'];
  searchTerm: string = '';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }
  
  ngOnInit(){
    this.getAllProducts()
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

  searchProducts(name: string): Observable<any>{
    return this.http.get<any[]>(`http://localhost:5000/api/product?name=${name}`)
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') ?? '';
  }
}
