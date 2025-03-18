import { adminRoutes } from './Main/admin/admin.routing.module';
import { Routes } from '@angular/router';
import { CartComponent } from '../app/Cart.main/cart/cart.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { customerRoutes } from './Main/customer/customer.routes';
export const routes: Routes = [
    {
        path: 'cart',
        component: CartComponent,
        title: 'Cart'
    },
    {
        path: 'customer',
        children:customerRoutes
    },
    {
        path: 'admin',
        children:adminRoutes 
    },
    {
        path: '**',
        component: NotFoundPageComponent,
        title: '404 Not found'
    }
];
