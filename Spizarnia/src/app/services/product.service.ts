import { Product } from '../shared/models/Product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRODUCTS } from '../shared/constances/urls';
import { ProductModel } from '../shared/models/ProductModel';


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

}









