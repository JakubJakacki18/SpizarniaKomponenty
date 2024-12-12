import { Product } from '../../../../Spizarnia-backend/src/models/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRODUCTS } from '../shared/constances/urls';
import { ProductModel } from '../../../../Spizarnia-backend/src/models/ProductModel';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  createProduct(product : { expirationDate : Date, purchaseDate : Date, selectedProduct : ProductModel}): Observable<any> {
    return this.http.post(PRODUCTS,product);
  }

  constructor(private http: HttpClient) {}
  getAllProductModels():Observable<Product[]>
  {
     return this.http.get<Product[]>(PRODUCTS);
  }
  getProductByName(name : string):Observable<Product[]>
  {
     return this.http.get<Product[]>(PRODUCTS+`/${name}`);
  }
  getAllProductsWithoutMapping():Observable<Product[]>
  {
    return this.http.get<Product[]>(PRODUCTS+"/NoMap");
  }
  getProductById(id:number):Observable<Product>
  {
    return this.http.get<Product>(PRODUCTS+`/${id}`);
  }
  
}









