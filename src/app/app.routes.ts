import { adminRoutes } from './Main/admin/admin.routing.module';
import { Routes } from '@angular/router';
import { CartComponent } from '../app/Cart.main/cart/cart.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { customerRoutes } from './Main/customer/customer.routes';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

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
        path: 'sign-in',
        component: SignInComponent, 
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        title: 'SignUP'
    },
    {
        path: '**',
        component: NotFoundPageComponent,
        title: '404 Not found'
    }
];
