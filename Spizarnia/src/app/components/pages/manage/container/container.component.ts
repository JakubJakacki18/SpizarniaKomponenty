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
import { SnackBarService } from '../../../../services/snack-bar.service';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../../../../Spizarnia-backend/src/models/Product';
import { SnackBarResultType } from '../../../../shared/constances/additional.types';

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
    private datePipe: DatePipe,
    private snackBarService: SnackBarService,
    private productService: ProductService
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
  this.productService.getAllProducts().subscribe({
    next: (data) => {
      console.log('Fetched products:', data);
      data.forEach(product => {
      });
      if (this.categoryName) {
        this.products = data.filter(product => {
          const categoryName = product.category?.categoryName?.toLowerCase();
          return product.categoryName.toLowerCase() === this.categoryName.toLowerCase();
        });
      } else {
        this.products = data; 
      }
      console.log('Filtered products:', this.products);
      this.dataSource.data = this.products;
    },
    error: (error) => {
      this.snackBarService.openSnackBar("Nie udało się pobrać produktów", SnackBarResultType.Error);
      console.error('Error fetching products:', error);
    }}
  );
}



  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'shortDate') ?? '';
  }
}
