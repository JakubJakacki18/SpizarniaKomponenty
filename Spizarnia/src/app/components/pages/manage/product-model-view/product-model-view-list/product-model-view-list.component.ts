import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { ProductModelService } from './../../../../../services/product-model.service'; // Import serwisu
import { MatDialog } from '@angular/material/dialog';
import { ProductModelEditDialogComponent } from '../../../../partials/product-model-edit-dialog/product-model-edit-dialog.component';  // Correct path
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SnackBarService } from '../../../../../services/snack-bar.service';
import { SnackBarResultType } from '../../../../../shared/constances/additional.types';
import { DialogService } from '../../../../../services/dialog.service';
@Component({
  selector: 'app-product-model-view-list',
  standalone: true,
  imports: [
 MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    FormsModule
  ],
  templateUrl: './product-model-view-list.component.html',
  styleUrl: './product-model-view-list.component.css',
  providers: [DatePipe]
})
export class ProductModelViewListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'quantity', 'categoryName', 'type', 'price', 'edit', 'delete'];
  products: any[] = [];
  dataSource = new MatTableDataSource<any>([]); 
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productModelService: ProductModelService, private http: HttpClient, private dialog: MatDialog, private snackBarService : SnackBarService, private dialogService : DialogService) {}

  ngOnInit(): void {
    this.loadProductModels(); 
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort; 
    }
  }

  
  loadProductModels(): void {
  this.productModelService.getAllProductModels().subscribe({
    next: (data) => {
      this.dataSource.data = data;
      console.log('Pobrano dane:', data);
    },
    error: (err) => {
      console.error('Błąd podczas pobierania modeli produktów:', err);
      this.snackBarService.openSnackBar('Nastąpił problem podczas pobierania modeli produktów:',SnackBarResultType.Error);
    },
  });
}

async deleteProduct(productId: number) {
  const dataDialog : {title: string, message: string} = {title : 'Usuwanie produktu', message : 'Czy na pewno chcesz usunąć ten produkt?'}
  const dialogAnswer = await this.dialogService.openConfirmDialog(dataDialog);

  if (dialogAnswer) {
    this.http.delete(`http://localhost:5000/api/productModel/${productId}`).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(product => product.id !== productId);
        this.snackBarService.openSnackBar("Produkt został usunięty!",SnackBarResultType.Success);
        
      },
      error: (error) => {
        console.error('Błąd podczas usuwania produktu:', error);
        this.snackBarService.openSnackBar("Nie udało się usunąć produktu",SnackBarResultType.Error);
      }}
    );
  }
}

updateProduct(updatedProduct: any) {
  this.http.put(`http://localhost:5000/api/productModel/${updatedProduct.id}`, updatedProduct).subscribe({
    next: (response) => {
      console.log('Produkt zaktualizowany:', response);
      this.snackBarService.openSnackBar("Produkt został zaktualizowany!",SnackBarResultType.Success);
      this.loadProductModels(); // Refresh the list after update
    },
    error: (error) => {
      console.error('Aktualizacja produktu nie powiodła się:', error);
      this.snackBarService.openSnackBar("Aktualizacja produktu nie powiodła się",SnackBarResultType.Error);
    }
});
}


  // Edycja produktu
  editProduct(product: any): void {
  const dialogRef = this.dialog.open(ProductModelEditDialogComponent, {
    width: '400px',
    data: {
      price: product.price.toString(),
      categoryName: product.category.categoryName,
      type: product.type
    }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      const updatedProduct = { ...product, ...result };
      this.updateProduct(updatedProduct);
    }
  });
}

  
}
