import { Routes } from '@angular/router';
// import { AdminComponent } from './admin.component';
import { CustomerComponent } from './customer.component';
import { ProductComponent } from './product/product.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerComponent, // Wrap everything inside this
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' }, 
      { path: 'products', component: ProductComponent  },
    //   { path: 'products', component: AllProductsComponent },    دا مثال بس
    //   { path: 'orders', component:AllOrdersComponent}
    ]
  }
];

