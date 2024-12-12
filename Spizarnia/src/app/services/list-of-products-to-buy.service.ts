import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListOfProductsToBuy } from '../../../../Spizarnia-backend/src/models/ListOfProductsToBuy';
import { LISTOFPRODUCTSTOBUY } from '../shared/constances/urls';
import { Product } from '../shared/models/Product';
import { ProductModel } from '../shared/models/ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ListOfProductsToBuyService {
  constructor(private http: HttpClient) { }
  getAllListOfProductsToBuy():Observable<ListOfProductsToBuy[]>
  {
    return this.http.get<ListOfProductsToBuy[]>(LISTOFPRODUCTSTOBUY);
  }
  createEntryInListOfProductsToBuy(newEntry: { idProductModel : number, quantity: number}): Observable<any> 
  {
    return this.http.post(LISTOFPRODUCTSTOBUY, newEntry);
  }



}
