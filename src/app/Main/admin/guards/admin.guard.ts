import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/customer/products']);
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.role === 'admin') {
        return true;
      }
    } catch (e) {
      console.error('Invalid token', e);
    }

    this.router.navigate(['/cart']); // Adjusted for your customer route
    return false;
  }
}
