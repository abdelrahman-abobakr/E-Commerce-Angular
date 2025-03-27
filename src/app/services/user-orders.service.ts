import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})
export class UserOrdersService {
  private apiUrl = 'http://localhost:3000/orders'; // Replace with your API endpoint

  constructor(private http: HttpClient, private userInfoService: UserInfoService) {}

  /** Get user orders */
  getUserOrders(): Observable<any> {
    const userDetails = this.userInfoService.getUserDetails();
    console.log('User Details:', userDetails);
  
    const token = localStorage.getItem('token');
    console.log('Token from Local Storage:', token); // Log token
  
    if (!token) {
      throw new Error('Authorization token is missing');
    }
  
    if (!userDetails || !userDetails._id) {
      throw new Error('User ID not found in user details');
    }
  
    const headers = new HttpHeaders()
      .set('token', token) // ✅ Explicitly set headers using `.set()`
      .set('Content-Type', 'application/json');
  
    const requestUrl = `${this.apiUrl}/${userDetails._id}`;
    console.log('Requesting orders from:', requestUrl);
    console.log('Request Headers:', headers.keys()); 
  
    return this.http.get(requestUrl, { headers });
  }
  
}
