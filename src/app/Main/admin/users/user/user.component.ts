import { Component, inject, Input, signal, } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../interfaces/user';
import { OrdersService } from '../../../../services/orders.service';
const DEFAULT_USER: User = {
  _id: 'hi',
  name: '',
  email: '',
  role: '',
  isVerified:true,
  password:''
}
@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  usersService = inject(UsersService);
  ordersService = inject(OrdersService);
  route = inject(ActivatedRoute);

  userOrders = signal<any[]>([])
  user = signal<User>(DEFAULT_USER);
  error = signal<string | null>(null);
  @Input() id: string = '';
  ngOnInit() {

    // getting user data
    this.route.paramMap.subscribe(params => {
      const userId = params.get('id'); // Get the `id` parameter
      if (userId) {
        this.usersService.getUser(userId).subscribe((res) => { this.user.set(res.user) ; console.log(res) })
      } else {
        this.error.set('User ID not found in the URL.');
      }
    });

    // getting orders of user
    this.ordersService.getUserOrders(this.id).subscribe((res)=>{console.log(res.orders); this.userOrders.set(res.orders); console.log(this.userOrders)})
  }
}
