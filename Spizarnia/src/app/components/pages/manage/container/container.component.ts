import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf and ngFor
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    CommonModule, // Add CommonModule here
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  providers: [DatePipe]
})
export class ContainerComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'quantity', 'purchaseDate', 'expirationDate'];
  searchTerm: string = '';
  categoryName: string = ''; // Category name from URL
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

ngOnInit() {
  this.route.params.subscribe(params => {
    this.categoryName = params['categoryName']; // Pobieranie nazwy kategorii z URL
    console.log('Category Name:', this.categoryName);  // Log category name
    this.getAllProducts();
  });
}


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


getAllProducts() {
  this.http.get<any[]>('http://localhost:5000/api/product').subscribe(
    (data) => {
      console.log('Fetched products:', data);
      
      // Sprawdzamy struktury kategorii
      data.forEach(product => {
      });

      // Jeśli istnieje categoryName, filtrujemy
      if (this.categoryName) {
        this.products = data.filter(product => {
          const categoryName = product.category?.categoryName?.toLowerCase();
          return product.categoryName.toLowerCase() === this.categoryName.toLowerCase();
        });
      } else {
        this.products = data; 
      }

      // Sprawdzamy, co zostało przefiltrowane
      console.log('Filtered products:', this.products);

      // Ustawiamy dane w źródle tabeli
      this.dataSource.data = this.products;
    },
    (error) => {
      console.error('Error fetching products:', error);
    }
  );
}



  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') ?? '';
  }
}
