import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient) { }
  getProducts():Observable<any> {
    return this.http.get('http://localhost:3000/all',
      {headers:{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2NiNzdlZTQ1MWQ0MGM1OTJjY2I0ZGYiLCJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDEzODk1MTl9.UC3SZz264SsNecvuPz34uup2ypQloF3-_uYDTbLTe-o'} }
    );
  }
  getProductById(id:string):Observable<any> {
    return this.http.get(`http://localhost:3000/product/${id}`,
      {headers:{'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2NiNzdlZTQ1MWQ0MGM1OTJjY2I0ZGYiLCJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDEzODk1MTl9.UC3SZz264SsNecvuPz34uup2ypQloF3-_uYDTbLTe-o'} }
    );
  }



}
