import { Component, OnInit } from '@angular/core';
// import { UserInfoService } from '../../../services/user-info.service';
import { UserInfoService } from '../../../services/user-info.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserOrdersService } from '../../../services/user-orders.service';
import { NgFor, NgIf } from '@angular/common';
// import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-profile',
  imports: [NgIf , NgFor],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userDetails: any;
  orders: any[] = [];
  errorMessage: string | null = null;
  constructor(private userInfoService: UserInfoService , private userOrdersService:UserOrdersService) {}

  ngOnInit(): void {
    this.userDetails = this.userInfoService.getUserDetails();
    this.userOrdersService.getUserOrders().subscribe({
      next: (orders) => this.orders = orders,
      error: (err) => this.errorMessage = 'Failed to load orders',
    });
  }
  
}
