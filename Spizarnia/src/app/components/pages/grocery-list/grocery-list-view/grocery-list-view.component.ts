import { Component, ViewChild, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http'; // Dodano HttpClient
import { ProductModelService } from '../../../../services/product-model.service';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../../../../Spizarnia-backend/src/models/Product';
import { ProductModel } from '../../../../../../../Spizarnia-backend/src/models/ProductModel';
import { ListOfProductsToBuyService } from '../../../../services/list-of-products-to-buy.service';
import { ListOfProductsToBuy } from '../../../../../../../Spizarnia-backend/src/models/ListOfProductsToBuy';
import { DialogService } from '../../../../services/dialog.service';
import { type } from 'node:os';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-grocery-list-view',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule, FormsModule],
  templateUrl: './grocery-list-view.component.html',
  styleUrls: ['./grocery-list-view.component.css'],
  providers: [DatePipe, ListOfProductsToBuyService, ProductModelService, ProductService, DialogService]
})
export class GroceryListViewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'quantityOfProduct', 'categoryName', 'quantity', 'price', 'totalPrice', 'edit', 'delete'];
  dataSource = new MatTableDataSource<ListOfProductsToBuy>([]); // Table data
  totalSummaryPrice: number = 0;  // Variable to hold the total price
  expiredProducts: Product[] = [];
  productModelsToList: ProductModel[] = [];
  @ViewChild(MatSort) sort!: MatSort; // Sorting functionality

  deleteExpiredProductsDialogData: { title: string; message: string; } = {
    title: 'Przeterminowane produkty',
    message: 'Masz przeterminowane produkty. Czy chciałbyś/chciałabyś usunąć je ze spiżarni i dodać je do listy zakupów?'
    
  }

  deleteProductToBuyFromCartDialogData: { title: string; message: string; } = {
    title: 'Usuwanie produktu',
    message: 'Czy na pewno chcesz usunąć ten produkt z listy zakupów?'
  }

  constructor(private dialogService: DialogService, private productModelService: ProductModelService, private productService: ProductService, private listOfProductsToBuyService: ListOfProductsToBuyService) { }

  ngOnInit() {
    console.log('GroceryListViewComponent initialized');
    this.getAllCartItems();
    this.loadExpiredProducts();
    
    
    
  }
  
  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Sorting after view initialization
    
  }


  loadExpiredProducts() {
    this.productService.getAllProductsWithoutMapping().subscribe({
      next: (data: Product[]) => {
        console.log('Pobrano produkty:', data);
        const currentDate = new Date();
        this.expiredProducts = data.filter((product) => {
          const expirationDate = new Date(product.expirationDate);
          return expirationDate.getTime() < currentDate.getTime();
        });
        this.deleteExpiredProducts();
        this.calculateTotalPrice(this.dataSource.data);
      },
      error: (error: any) => console.error('Błąd podczas pobierania produktów:', error)
    });
  }

  async deleteExpiredProducts() {
    console.log("expired", this.expiredProducts)
    console.log(this.expiredProducts.length > 0);
    if (!(this.expiredProducts.length > 0))
      return;
    let dialogAnswer = await this.dialogService.openConfirmDialog(this.deleteExpiredProductsDialogData);
    if (!dialogAnswer)
      return;

    this.expiredProducts.forEach((product) => {
      this.addProductToShoppingCart(product);
      location.reload()
    });
  }
  addProductToShoppingCart(product: Product) {
    const newEntry = {
      idProductModel: product.productModel?.id ?? -1,
      quantity: 1
    };

    this.listOfProductsToBuyService.createEntryInListOfProductsToBuy(newEntry).subscribe({
      next: (response) => {
        console.log('Produkt dodany do listy zakupów', response);
        this.deleteProductFromPantry(product.id);

      },
      error: (error) => {
        console.error('Błąd podczas dodawania produktu do listy zakupów:', error);
      }
    });
  }
  deleteProductFromPantry(id: number) {
    this.productService.deleteProductById(id).subscribe(
      {
        next: (response) => {
          console.log('Produkt został pomyślnie usunięty', response);
        },
        error: (error) => {
          console.error('Błąd podczas usuwania produktu ze spiżarni:', error);
        }
      });
  }
  getAllCartItems() {
    this.listOfProductsToBuyService.getAllListOfProductsToBuy().subscribe({
      next: (data) => {
        console.log('Pobrano dane:', data);
        this.dataSource.data = data;
        this.calculateTotalPrice(this.dataSource.data);
      },
      error: (err) => console.error('Błąd podczas pobierania danych: ', err),
    })
  }

  calculateTotalPrice(data: ListOfProductsToBuy[]) {
    this.totalSummaryPrice = data.reduce((sum, product) => {
      return sum + ((product.products?.price ?? 0) * product.quantity);
    }, 0);
  }



  // Edit product (for your requirements)
  async editProduct(productToBuyId: number) {
    const response: ListOfProductsToBuy = await firstValueFrom(
      this.listOfProductsToBuyService.getProductOnListById(productToBuyId)
    );
    console.log('Odpowiedź z serwera:', response);
    const dialogAnswer = await this.dialogService.openEditProductDialog(response);
    if (dialogAnswer <0) {
      console.log(dialogAnswer,'Nie dokonano zmian w ilości produktu');
      return;
    }
    this.listOfProductsToBuyService.updateProductModelInCart(productToBuyId, dialogAnswer).subscribe({
      next: (response) => {
        console.log('Ilość produktu została zaktualizowana', response);
        this.getAllCartItems();
        //this.calculateTotalPrice(this.dataSource.data);
      },
      error: (error) => {
        console.error('Błąd podczas aktualizacji ilości produktu:', error);
      }
    });
  }

  // Delete product
  async deleteProductModelFromCart(productToBuyId: number) {
    let dialogAnswer = await this.dialogService.openConfirmDialog(this.deleteProductToBuyFromCartDialogData);
    if (!dialogAnswer)
      return;
    this.listOfProductsToBuyService.deleteProductModelFromCart(productToBuyId).subscribe({
      next: (response) => {
        console.log('Produkt został usunięty z listy zakupów', response);
        //this.dataSource.data = this.dataSource.data.filter((product) => product.id !== productToBuyId);
        this.getAllCartItems();
        //this.calculateTotalPrice(this.dataSource.data);
      },
      error: (error) => {
        console.error('Błąd podczas usuwania produktu z listy zakupów:', error);
      }
    });
    // if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
    //   this.http.delete(`http://localhost:5000/api/product/${productId}`).subscribe(
    //     () => {
    //       this.dataSource.data = this.dataSource.data.filter((product) => product.id !== productId);
    //       console.log(`Produkt o ID ${productId} został usunięty.`);
    //     },
    //     (error) => {
    //       console.error('Błąd podczas usuwania produktu:', error);
    //     }
    //   );
    // }
  }
}
