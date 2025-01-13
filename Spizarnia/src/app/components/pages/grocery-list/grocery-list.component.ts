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
    private listOfProductsToBuyService: ListOfProductsToBuyService
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

      this.dataSource.filter = searchTermLower; // Użycie wbudowanego filtrowania w MatTableDataSource
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        
        return data.products.name.toLowerCase().includes(filter); // Wyszukiwanie po nazwie
      };
    } else {
      this.dataSource.filter = ''; // Reset filtra
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
              error: (err) => reject(err)
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
            console.error('Błąd podczas czyszczenia listy zakupów:', error);
          });
      },
      error: (error) => {
        console.error('Błąd podczas pobierania listy produktów:', error);
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
      error: (error: any) => console.error('Błąd podczas pobierania produktów:', error)
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
        this.deleteProductFromPantry(product.id);
      },
      error: (error) => {
        console.error('Błąd podczas dodawania produktu do listy zakupów:', error);
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
      }
    });
  }

  getAllCartItems() {
    this.listOfProductsToBuyService.getAllListOfProductsToBuy().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.calculateTotalPrice(this.dataSource.data);
      },
      error: (err) => console.error('Błąd podczas pobierania danych: ', err),
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
      }
    });
  }
}
