import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }
    getUserOrders(id:string): Observable<any> {
      // let token = JSON.parse(localStorage.getItem('token')||'')
      return this.http.get(`http://localhost:3000/orders/${id}`,
        { headers: { 'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2M5ZjlhZWNjZjk5MjdlYjYyMjBjYzgiLCJuYW1lIjoiYWJkZWxyYWhtYW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDEzNzMyNzJ9.NgETk6aEi3HKQu74ZV7YvovAjN9Y4EUPnAqFkz4N4mY' } }
      );
    }
}
