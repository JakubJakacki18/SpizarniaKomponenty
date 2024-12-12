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

@Component({
  selector: 'app-grocery-list-view',
  standalone: true,
  imports: [MatTableModule, MatSortModule, CommonModule, FormsModule],
  templateUrl: './grocery-list-view.component.html',
  styleUrls: ['./grocery-list-view.component.css'],
  providers: [DatePipe, ListOfProductsToBuyService]
})
export class GroceryListViewComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','quantityOfProduct',  'categoryName','quantity', 'price','totalPrice', 'edit', 'delete'];
  dataSource = new MatTableDataSource<ListOfProductsToBuy>([]); // Table data
  totalSummaryPrice: number = 0;  // Variable to hold the total price
  expiredProducts : Product[]= [];
  productModelsToList : ProductModel[] = [];
  @ViewChild(MatSort) sort!: MatSort; // Sorting functionality

  constructor(private productModelService: ProductModelService, private productService: ProductService, private listOfProductsToBuyService: ListOfProductsToBuyService) {}

  ngOnInit() {
    this.getAllCartItems();
    this.loadExpiredProducts();
    this.deleteExpiredProducts();

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Sorting after view initialization
  }


  loadExpiredProducts() {
    this.productService.getAllProductsWithoutMapping().subscribe({
      next: (data : Product[]) => {
        const currentDate = new Date();
        this.expiredProducts = data.filter((product) => {
          const expirationDate = new Date(product.expirationDate);
          return expirationDate.getTime() < currentDate.getTime(); 
        });
      },
      error: (error : any) => console.error('Błąd podczas pobierania produktów:', error)
    });  
  }

  deleteExpiredProducts()
  {
    console.log("expired",this.expiredProducts)
    console.log(this.expiredProducts.length>0);
    if(!(this.expiredProducts.length>0))
      return;
    if (!confirm('Masz przeterminowane produkty. Czy chciałbyś/chciałabyś usunąć je ze spiżarni i dodać je do listy zakupów?')) 
        return;
    this.expiredProducts.forEach((product)=>
      {
        this.addProductToShoppingCart(product);
      });
  }
  addProductToShoppingCart(product : Product)
  {
    const newEntry = {
      idProductModel: product.productModel?.id?? -1,
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
  deleteProductFromPantry(id:number)
  {
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
  getAllCartItems()
  {
    this.listOfProductsToBuyService.getAllListOfProductsToBuy().subscribe({
      next: (data) => 
        {
          this.dataSource.data = data;
          this.calculateTotalPrice(data)
        },
        error: (err) => console.error('Błąd podczas pobierania danych: ', err),
    })
  }
  
  calculateTotalPrice(data : ListOfProductsToBuy[]) {
    this.totalSummaryPrice = data.reduce((sum, product) => {
      return sum + ((product.products?.price ?? 0) * product.quantity);
    }, 0);
  }



  // Edit product (for your requirements)
  editProduct(product: any): void {
    console.log('Edycja produktu: ', product);
    // You can open an edit form or redirect the user here
  }

  // Delete product
  deleteProductModelFromCart(productModelId: number) {
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
