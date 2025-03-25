import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { User } from '../../../../interfaces/user';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-all-users',
  imports: [RouterLink],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
  usersService = inject(UsersService);
  allUsers = signal<User[]>([]);
  error = signal<string | null>(null);

  currentPage = 1; 
  pageSize = 30; 
  isLoading = signal<boolean>(false); 
  totalPages = signal<number>(1);
 
  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    if (this.isLoading()) 
      return;

    this.isLoading.set(true);

    this.usersService.getUsers(this.currentPage, this.pageSize).subscribe((res)=>{
      this.allUsers.update((users)=>[...users, ...res.users]);
      this.totalPages.set(res.totalPages);
      this.currentPage++;
      this.isLoading.set(false)
    },
    (err) => {
      this.error.set(err.error.message);
      this.isLoading.set(false);
    });
  }

  loadMore() {
    if (this.currentPage <= this.totalPages()) {
      this.loadUsers();
    }
  }

  confirmDelete(userId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(userId);
      }
    });
  }

  deleteUser(userId: string) {
    let admins = this.allUsers().filter((user)=> user.role == 'admin');
    if (admins.length == 1){
      Swal.fire({
        title:'Warning!',
        text:"deleting last admin is not allowed",
        timer:2000,
      })
    }else{
      this.usersService.deleteUser(userId).subscribe(
        (res) => {
          this.allUsers.set(this.allUsers().filter(user => user._id !== userId));
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        },
        (err) => {
          Swal.fire('Error!', 'Failed to delete the user.', 'error');
        }
      );
    }
  }


}
