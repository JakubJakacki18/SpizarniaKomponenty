import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModelService } from '../../../services/product-model.service';
import { ProductService } from '../../../services/product.service';
import { ListOfProductsToBuyService } from '../../../services/list-of-products-to-buy.service';
import { DialogService } from '../../../services/dialog.service';
import { Product } from '../../../../../../Spizarnia-backend/src/models/Product';
import { ListOfProductsToBuy } from '../../../../../../Spizarnia-backend/src/models/ListOfProductsToBuy';
import { firstValueFrom } from 'rxjs';
import { SnackBarComponent } from '../../partials/snack-bar/snack-bar.component';
import { SnackBarService } from '../../../services/snack-bar.service';
import { SnackBarResultType } from '../../../shared/constances/additional.types';

@Component({
  selector: 'app-grocery-list',
  //Standalone?
  imports: [CommonModule, FormsModule, MatTableModule, MatSortModule],
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.css'],
  providers: [ProductModelService, ProductService, ListOfProductsToBuyService, DialogService]
})
export class GroceryListComponent implements OnInit {
  
  dataSource = new MatTableDataSource<any>([]);
  totalSummaryPrice: number = 0;
  expiredProducts: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'quantityOfProduct', 'categoryName', 'quantity', 'price', 'totalPrice', 'edit', 'delete'];

  @ViewChild(MatSort) sort!: MatSort;

  deleteExpiredProductsDialogData: { title: string; message: string; } = {
    title: 'Przeterminowane produkty',
    message: 'Masz przeterminowane produkty. Czy chciałbyś/chciałabyś usunąć je ze spiżarni i dodać je do listy zakupów?'
  }

  deleteProductToBuyFromCartDialogData: { title: string; message: string; } = {
    title: 'Usuwanie produktu',
    message: 'Czy na pewno chcesz usunąć ten produkt z listy zakupów?'
  }

  clearListDialogData: { title: string; message: string; } = {
    title: 'Usuwanie listy zakupów',
    message: 'Czy na pewno chcesz usunąć wszystkie produkty z listy zakupów?'
  }

  constructor(
    private dialogService: DialogService,
    private productModelService: ProductModelService,
    private productService: ProductService,
    private listOfProductsToBuyService: ListOfProductsToBuyService,
    private snackBarService : SnackBarService
  ) {}

  ngOnInit() {
    this.getAllCartItems();
    this.loadExpiredProducts();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  searchTermGrocery: string = '';
  onSearch() {
    if (this.searchTermGrocery.length >= 2) {
      console.log(this.searchTermGrocery.toLowerCase());
      const searchTermLower = this.searchTermGrocery.toLowerCase();

      this.dataSource.filter = searchTermLower; 
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        
        return data.products.name.toLowerCase().includes(filter); 
      };
    } else {
      this.dataSource.filter = ''; 
    }
  }
  
//Dodać endpoint?
  // Usuwam jeden po drugim - miałem problem z endpointami przez to w jaki sposób wyświetlamy tutaj produkty
  async clearList() {
    let dialogAnswer = await this.dialogService.openConfirmDialog(this.clearListDialogData);
    if (!dialogAnswer) return;
    
    this.listOfProductsToBuyService.getAllListOfProductsToBuy().subscribe({
      next: (products) => {
        const deletePromises = products.map(product => {
          return new Promise((resolve, reject) => {
            this.listOfProductsToBuyService.deleteProductModelFromCart(product.id).subscribe({
              next: () => resolve(true),
              error: (err) => {
                this.snackBarService.openSnackBar("Nie udało się usunąć produktu z koszyka",SnackBarResultType.Error)
                reject(err)}
            });
          });
        });
  
        // Execute all deletes
        Promise.all(deletePromises)
          .then(() => {
            this.getAllCartItems(); // Refresh the list
            console.log('Lista zakupów została wyczyszczona');
          })
          .catch(error => {
            this.snackBarService.openSnackBar("Czyszczenie listy zakupów nie powiodło się",SnackBarResultType.Error)
            console.error('Błąd podczas czyszczenia listy zakupów:', error);
          });
      },
      error: (error) => {
        console.error('Błąd podczas pobierania listy produktów:', error);
        this.snackBarService.openSnackBar("Pobieranie listy zakupów nie powiodło się",SnackBarResultType.Error)
      }
    });
  }
  
  loadExpiredProducts() {
    this.productService.getAllProductsWithoutMapping().subscribe({
      next: (data: Product[]) => {
        const currentDate = new Date();
        this.expiredProducts = data.filter((product) => {
          const expirationDate = new Date(product.expirationDate);
          return expirationDate.getTime() < currentDate.getTime();
        });
        this.deleteExpiredProducts();
        this.calculateTotalPrice(this.dataSource.data);
      },
      error: (error: any) => {
        console.error('Błąd podczas pobierania produktów:', error)
        this.snackBarService.openSnackBar("Pobieranie produktów nie powiodło się",SnackBarResultType.Error);
      }
    });
  }

  async deleteExpiredProducts() {
    if (!(this.expiredProducts.length > 0)) return;
    let dialogAnswer = await this.dialogService.openConfirmDialog(this.deleteExpiredProductsDialogData);
    if (!dialogAnswer) return;

    this.expiredProducts.forEach((product) => {
      this.addProductToShoppingCart(product);
      location.reload();
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
        //this.snackBarService.openSnackBar("Produkt dodany do listy zakupów",SnackBarResultType.Success)
        this.deleteProductFromPantry(product.id);
      },
      error: (error) => {
        console.error('Błąd podczas dodawania produktu do listy zakupów:', error);
        this.snackBarService.openSnackBar('Nie udało się dodać produktu do listy zakupów',SnackBarResultType.Error);
      }
    });
  }

  deleteProductFromPantry(id: number) {
    this.productService.deleteProductById(id).subscribe({
      next: (response) => {
        console.log('Produkt został pomyślnie usunięty', response);
      },
      error: (error) => {
        console.error('Błąd podczas usuwania produktu ze spiżarni:', error);
        this.snackBarService.openSnackBar('Nie udało się usunąć produktu ze spiżarni',SnackBarResultType.Error);
      }
    });
  }

  getAllCartItems() {
    this.listOfProductsToBuyService.getAllListOfProductsToBuy().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.calculateTotalPrice(this.dataSource.data);
      },
      error: (err) => {
        console.error('Błąd podczas pobierania danych: ', err),
        this.snackBarService.openSnackBar('Nie udało się pobrać listy zakupów',SnackBarResultType.Error);
      }
    });
  }

  calculateTotalPrice(data: ListOfProductsToBuy[]) {
    this.totalSummaryPrice = data.reduce((sum, product) => {
      return sum + ((product.products?.price ?? 0) * product.quantity);
    }, 0);
  }

  async editProduct(productToBuyId: number) {
    const response: ListOfProductsToBuy = await firstValueFrom(
      this.listOfProductsToBuyService.getProductOnListById(productToBuyId)
    );
    const dialogAnswer = await this.dialogService.openEditProductDialog(response);
    if (dialogAnswer < 0) return;
    this.listOfProductsToBuyService.updateProductModelInCart(productToBuyId, dialogAnswer).subscribe({
      next: (response) => {
        this.getAllCartItems();
      },
      error: (error) => {
        console.error('Błąd podczas aktualizacji ilości produktu:', error);
        this.snackBarService.openSnackBar('Nie udało się zmienić ilości produktu',SnackBarResultType.Error);

      }
    });
  }

  async deleteProductModelFromCart(productToBuyId: number) {
    let dialogAnswer = await this.dialogService.openConfirmDialog(this.deleteProductToBuyFromCartDialogData);
    if (!dialogAnswer) return;
    this.listOfProductsToBuyService.deleteProductModelFromCart(productToBuyId).subscribe({
      next: (response) => {
        this.getAllCartItems();
      },
      error: (error) => {
        console.error('Błąd podczas usuwania produktu z listy zakupów:', error);
        this.snackBarService.openSnackBar('Nie udało się usunąć produktu z listy zakupów',SnackBarResultType.Error);
      }
    });
  }
}
