import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token'); // Check if token exists
  }

  logout() {
    localStorage.removeItem('token'); // Remove token from local storage
    this.isLoggedIn = false;
  }
}
