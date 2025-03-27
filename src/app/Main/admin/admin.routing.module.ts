import { AddUserComponent } from './users/add-user/add-user.component';
import { Routes } from '@angular/router';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { AdminComponent } from './admin.component';
import { AllOrdersComponent } from './orders/all-orders/all-orders.component';
import { UserComponent } from './users/user/user.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { AddProductComponent } from './products/add-products/add-products.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { AdminGuard } from './guards/admin.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: AdminComponent, // Wrap everything inside this
    children: [
      { path: 'users/add-user', component: AddUserComponent },
      { path: 'users/:id', component: UserComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: AllUsersComponent },
      // { path: 'products/add-products', component: AddProductsComponent },
      // { path: 'products', component: AllProductsComponent },
      { path: 'products', component: AllProductsComponent },
      { path: 'products/add', component: AddProductComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'orders', component: AllOrdersComponent },
    ],
  },
];
