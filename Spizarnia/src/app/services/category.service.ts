import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../shared/models/Category';
import { Observable } from 'rxjs';
import { CATEGORIES } from '../shared/constances/urls';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  getAllCategories():Observable<Category[]>
  {
    return this.http.get<Category[]>(CATEGORIES);
  }
  constructor(private http: HttpClient)
  {

  }
}
