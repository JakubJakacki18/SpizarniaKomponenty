import { Injectable } from '@angular/core';
import { ProductModel } from '../shared/models/ProductModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PRODUCT_MODELS } from '../shared/constances/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductModelService {

  constructor(private http: HttpClient) {}

  getAllProductModels():Observable<ProductModel[]>
  {
    return this.http.get<ProductModel[]>(PRODUCT_MODELS);
  }
  createProduct(productData: { name: string, unit: string, price: number, quantity: number }): Observable<any> {
    return this.http.post(PRODUCT_MODELS, productData);
  }

}
