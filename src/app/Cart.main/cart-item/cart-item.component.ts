// import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
// import { CurrencyPipe } from '@angular/common';
// import { CartItemsService } from '../../services/cart-items.service';
// @Component({
//   selector: 'app-cart-item',
//   imports: [CurrencyPipe],
//   templateUrl: './cart-item.component.html',
//   styleUrl: './cart-item.component.css'
// })
// export class CartItemComponent {
//   @Input () product :any;
//   @Output() totalBillUpdated = new EventEmitter<number>(); // Emit total bill change

//   cartService = inject(CartItemsService)
//   increase(){
//     if(this.product.quantity < this.product.productID.stock){
//       this.product.quantity++;
//       this.updateTotalPrice();
//     }  
//   }

//   decrease(){
//     if(this.product.quantity > 0){
//       this.product.quantity--;
//       this.updateTotalPrice();
//     }
//   }

//   updateTotalPrice() {
//     this.cartService.updateCartItem(this.product.productID._id, this.product.quantity).subscribe(
//       (res: any) => {
//         console.log('Cart updated', res);
//         // this.totalBillUpdated.emit(res.cart.totalBill); // Emit the new total bill
//       },
//       (err) => console.log(err)
//     );
//   }
// }
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItemsService } from '../../services/cart-items.service';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() product: any;
  @Output() totalBillUpdated = new EventEmitter<number>(); // Emit total bill change

  cartService = inject(CartItemsService);

  increase() {
    if (this.product.quantity < this.product.productID.stock) {
      this.product.quantity++;
      this.updateTotalPrice();
    }
  }

  decrease() {
    if (this.product.quantity > 0) {
      this.product.quantity--;
      this.updateTotalPrice();
    }
  }

  updateTotalPrice() {
    // Update item's total price
    this.product.itemTotalPrice = this.product.quantity * this.product.productID.price;

    // Update cart on the server
    this.cartService.updateCartItem(this.product.productID._id, this.product.quantity).subscribe(
      (res: any) => {
        console.log('Cart updated', res);
        // Emit the new total bill to parent component
        this.totalBillUpdated.emit(res.cart.totalBill);
      },
      (err) => console.log(err)
    );
  }
}
