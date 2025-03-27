// import { Component, Input } from '@angular/core';
// import { Order } from '../../../../interfaces/order';

// @Component({
//   selector: 'app-order',
//   imports: [],
//   templateUrl: './order.component.html',
//   styleUrl: './order.component.css'
// })
// export class OrderComponent {
//   @Input () singleOorder: any;
// }

import { Component, inject, Input } from '@angular/core';
import { Order } from '../../../../interfaces/order';
// import { ProductsService } from '../../services/products.service';
// import { Product } from '../../interfaces/product';
import { ProductServiceService } from '../../../../services/product-service.service';
import { DatePipe, DecimalPipe, SlicePipe } from '@angular/common';
@Component({
  imports:[DatePipe, DecimalPipe, SlicePipe],
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input() singleOorder!: Order;
  productNames: {[key: string]: string} = {};

  constructor() {}
  private productsService = inject(ProductServiceService)
  ngOnInit() {
    // Fetch product names for all items in the order
    this.singleOorder.items.forEach(item => {
      this.productsService.getProductById(item.itemID).subscribe(
        (res:any) => {
          console.log(res.data)
          this.productNames[item.itemID] = res.data.name;
        },
        (err) => {
          console.error('Error fetching product:', err);
          this.productNames[item.itemID] = 'Unknown Product';
        }
      );
    });
  }

  getProductName(productId: string): string {
    return this.productNames[productId] || 'Loading...';
  }

  getSubtotal(): number {
    return this.singleOorder.items.reduce((sum, item) => sum + item.itemTotalPrice, 0);
  }



  
}