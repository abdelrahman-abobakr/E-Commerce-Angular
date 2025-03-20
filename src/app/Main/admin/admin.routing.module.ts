import { Routes } from '@angular/router';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { AdminComponent } from './admin.component';
import { AllOrdersComponent } from './orders/all-orders/all-orders.component';
import { UserComponent } from './users/user/user.component';
export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent, // Wrap everything inside this
    children: [
      { path: 'users/:id', component:UserComponent},
      { path: '', redirectTo: 'users', pathMatch: 'full' }, 
      { path: 'users', component: AllUsersComponent },
      { path: 'products', component: AllProductsComponent },
      { path: 'orders', component:AllOrdersComponent}
    ]
  }
];

