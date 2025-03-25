import { Routes } from '@angular/router';
// import { AdminComponent } from './admin.component';
import { CustomerComponent } from './customer.component';
import { CardComponent } from './card/card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerComponent, // Wrap everything inside this
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: CardComponent },
      {
        path: 'details/:id',
        component: ProductDetailsComponent,
        title: 'Product Details'
      }

    ]
  }
];

