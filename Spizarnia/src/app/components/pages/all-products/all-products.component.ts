import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = ['id', 'name', 'quantity', 'category', 'purchaseDate', 'expirationDate'];
  searchTerm: string = '';
  dataSource = new MatTableDataSource<any>([]); // Użycie MatTableDataSource dla sortowania

  @ViewChild(MatSort) sort!: MatSort; // Dodanie ViewChild do obsługi sortowania

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getAllProducts();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Ustawienie sortowania po inicjalizacji widoku
  }

  onSearch() {
    if (this.searchTerm.length >= 3) {
      const searchTermLower = this.searchTerm.toLowerCase();

      this.dataSource.filter = searchTermLower; // Użycie wbudowanego filtrowania w MatTableDataSource
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        return data.name.toLowerCase().includes(filter); // Wyszukiwanie po nazwie
      };
    } else {
      this.dataSource.filter = ''; // Reset filtra
    }
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
    );
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') ?? '';
  }
}
