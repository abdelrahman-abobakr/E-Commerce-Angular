import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

export const routes: Routes = [
    {
        path: 'cart',
        component: CartComponent,
        title: 'Cart'
    },
    {
        path: '**',
        component: NotFoundPageComponent,
        title: '404 Not found'
    }
];
