
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private tokenKey = 'token'; // Key where token is stored in local storage
  private jwtHelper = new JwtHelperService();

  constructor() {}

  /** Get the stored token */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }


  getUserDetails(): any {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        console.log(decodedToken)
        return decodedToken 
         // Decode JWT token
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  }
  
}
