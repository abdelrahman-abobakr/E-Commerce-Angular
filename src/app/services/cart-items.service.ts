import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  constructor(private http: HttpClient) { }

  getCartItems():Observable<any>{
    return this.http.get('https://dummyjson.com/carts/1');
  }
}
