import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn, ValidationErrors  } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../../services/users.service';


@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  
  addUserForm: FormGroup;
  error:string = '';
  success = '';

  constructor(private fb: FormBuilder, private router: Router){
    this.addUserForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(2)]],
      email:['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.pattern(new RegExp(/^[A-Za-z\d@$]{6,}$/))]],
      role: ['user'],
      isVerified:[false],
    }) 

  }

  userService = inject(UsersService);

  get formControls(){
    return this.addUserForm.controls;
  }

  handleSubmit() {
    if (this.addUserForm.invalid) {
      this.addUserForm.markAllAsTouched(); // Highlight errors
      return;
    }
    let formData = this.addUserForm.value;

    let user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      isVerified: formData.isVerified,
      role: formData.role
    }
    console.log("Registration Successful", user);
    
    this.userService.addUser(user).subscribe(
      (res)=>{
        console.log(res);
        this.success = res.message;

        setTimeout(() => {
          this.router.navigate(['/admin/users']); // Redirect to Home
        }, 3000);
      
      }, 
      (error)=>this.error = error.error.message
    );

    
  }
}
