import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Container } from '../shared/models/Container';
import { CONTAINERS} from "../shared/constances/urls"

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(private http: HttpClient) { }

  getAllContainers():Observable<Container[]>
  {
    return this.http.get<Container[]>(CONTAINERS);
  }
}
