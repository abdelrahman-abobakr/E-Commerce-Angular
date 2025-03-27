import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  constructor(private http: HttpClient) { }

  apiToken = localStorage.getItem('token')||'';

  getCartItems():Observable<any>{
    return this.http.get('http://localhost:3000/cart',
      {headers:{'token' : this.apiToken}}
    );
  }

  checkout(){
    return this.http.post('http://localhost:3000/checkout',{},
      {headers:{'token': this.apiToken}}
    );
  }
}
