// import { Card } from './../Main/customer/types/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Main/customer/types/product';
import { ProductResponse } from '../Main/customer/types/productResponce';


@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  private readonly apiUrl = 'http://localhost:3000'; 
  
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || ''; 
    return new HttpHeaders({ token });
  }

 
  getAllProducts(page: number = 1, limit: number = 5): Observable<{ res: Product[]; total: number }> {
    return this.http.get<{ res: Product[]; total: number }>(
      `${this.apiUrl}/all?page=${page}&limit=${limit}`,
      { headers: this.getHeaders() }
    );
  }


  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(
      `${this.apiUrl}/product/${id}`,
      { headers: this.getHeaders() }
    );
  }


  searchProducts(query: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${this.apiUrl}/search?query=${query}`,
      { headers: this.getHeaders() }
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/product/${id}`,
      { headers: this.getHeaders() }
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this.apiUrl}/product`,
      product,
      { headers: this.getHeaders() }
    );
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrl}/product/${id}`,
      product,
      { headers: this.getHeaders() }
    );
  }
}