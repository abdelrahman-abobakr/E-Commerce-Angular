import { Component, inject } from '@angular/core';
import { CartItemsService } from '../../services/cart-items.service';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})

export class CartComponent {
  cartService = inject(CartItemsService);
  cartItems:any;

  ngOnInit(){
    this.cartService.getCartItems().subscribe(
      (res)=>{console.log(res.userCart); this.cartItems = res.userCart? res.userCart.items : [] },
       
   );
  }


  purchase(){
    this.cartService.checkout().subscribe((res:any)=>{console.log(res.url); window.location.href = `${res.url}`},(err)=>{console.log(err)})
  }
}
