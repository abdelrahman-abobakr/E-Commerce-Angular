import { Component, inject, signal } from '@angular/core';
import { OrderComponent } from '../order/order.component';
import { OrdersService } from '../../../../services/orders.service';
import { Order,OrderItem } from '../../../../interfaces/order';
import { DatePipe, DecimalPipe, SlicePipe } from '@angular/common';
@Component({
  selector: 'app-all-orders',
  imports: [OrderComponent, DecimalPipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent {
  orderService = inject(OrdersService);

    // allUsers = signal<User[]>([]);
  allOrders = signal<Order[]>([]);
  profits = signal<number>(0);
  ngOnInit(){
    this.orderService.getAllOrders().subscribe(
      (res)=>{
        console.log( localStorage.getItem('token'))
        console.log(res.orders);
        this.allOrders.set(res.orders);
        res.orders.map(order=>this.profits.update(value => value+ order.totalBill))
      },
      (err)=>{
        console.log(err)
      }
    );
  }
}
