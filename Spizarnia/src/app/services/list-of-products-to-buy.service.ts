import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListOfProductsToBuy } from '../../../../Spizarnia-backend/src/models/ListOfProductsToBuy';
import { LISTOFPRODUCTSTOBUY } from '../shared/constances/urls';
@Injectable({
  providedIn: 'root'
})
export class ListOfProductsToBuyService {
  updateProductModelInCart(productToBuyId: number, dialogAnswer: number) {
    return this.http.patch(`${LISTOFPRODUCTSTOBUY}${productToBuyId}`, { quantity: dialogAnswer });
  }
  getProductOnListById(productToBuyId: number) {
    console.log(productToBuyId);
    return this.http.get<ListOfProductsToBuy>(LISTOFPRODUCTSTOBUY+productToBuyId);
  }
  constructor(private http: HttpClient) { }
  deleteProductModelFromCart(productToBuyId: number) {
    return this.http.delete(`${LISTOFPRODUCTSTOBUY}${productToBuyId}`);
  }
  getAllListOfProductsToBuy():Observable<ListOfProductsToBuy[]>
  {
    return this.http.get<ListOfProductsToBuy[]>(LISTOFPRODUCTSTOBUY);
  }
  createEntryInListOfProductsToBuy(newEntry: { idProductModel : number, quantity: number}): Observable<any> 
  {
    return this.http.post(LISTOFPRODUCTSTOBUY, newEntry);
  }



}
