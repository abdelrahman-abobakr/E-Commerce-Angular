import { Component } from '@angular/core';
import { OrderComponent } from '../order/order.component';
@Component({
  selector: 'app-all-orders',
  imports: [OrderComponent],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent {

}
