import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product'; // Import the Product interface

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(
    page: number = 1,
    limit: number = 10
  ): Observable<{ data: Product[]; totalPages: number }> {
    return this.http.get<{ data: Product[]; totalPages: number }>(
      `${this.apiUrl}/all?page=${page}&limit=${limit}`,
      {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2UzMjQwZWMwODRjZjgzOTY1Y2IyNzEiLCJuYW1lIjoiYWJkZWxyYWhtYW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDMwMjI2OTZ9.MZH6wVbVI2gZnJtr63guZPbMHhDnHIn5TQdZHk21dVY',
        },
      }
    );
  }

  // getProductById(id: string): Observable<Product> {
  //   return this.http.get<Product>(`${this.apiUrl}/${id}`);
  // }

  deleteProduct(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/delete/${id}`);
  }

  getProductById(id: string) {
    return this.http.get<{ data: Product }>(`${this.apiUrl}/product/${id}`);
  }

  createProduct(
    product: Omit<
      Product,
      '_id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'reviews'
    >
  ) {
    return this.http.post<{ data: Product }>(
      `${this.apiUrl}/createproduct`,
      product
    );
  }

  updateProduct(id: string, product: Partial<Product>) {
    return this.http.put<{ data: Product }>(
      `${this.apiUrl}/update/${id}`,
      product
    );
  }
}
