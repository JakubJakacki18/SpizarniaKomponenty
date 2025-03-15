import { Injectable } from '@angular/core';
import { ProductModel } from '../../../../Spizarnia-backend/src/models/ProductModel';
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
  getAllProductModelsWithoutMapping():Observable<ProductModel[]>
  {
    return this.http.get<ProductModel[]>(PRODUCT_MODELS+"/NoMap");
  }
  createProduct(productData: { name: string, unit: string, price: number, quantity: number }): Observable<any> {
    return this.http.post(PRODUCT_MODELS, productData);
  }

  checkDuplicateProduct(product: any): Observable<any> {
    return this.http.post(PRODUCT_MODELS+`/checkDuplicate`, product);
  }
  updateProductModel(updatedProduct : any): Observable<any>
  {
    return this.http.put(PRODUCT_MODELS+`/${updatedProduct.id}`, updatedProduct);
  }
  deleteProductModelById(productModelId : any): Observable<any>
  {
    return this.http.delete(PRODUCT_MODELS+`/${productModelId}`);
  }


}
