import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'quantity', 'category', 'purchaseDate', 'expirationDate'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.http.get<any[]>('http://localhost:5000/api/product').subscribe(
      (data) => {
        this.products = data;
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Błąd!', error);
      }
    );
  }

  onSearch(searchTerm: string) {
    if (searchTerm.length >= 3) {
      this.dataSource.filter = searchTerm.toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }
}
