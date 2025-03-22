import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule,  } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

export class SignInComponent {
  errorMessage: string = '';
  signInForm: FormGroup;

  constructor(private userService: UsersService) { 
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)
      ])
    });
  }

  get formControls() {
    return this.signInForm.controls;
  }

  handelSignIn() {
    if (this.signInForm.invalid) {
      console.log("Form is invalid.");
      return;
    }

    console.log("Login Data:", this.signInForm.value);
  }
}
  // onSubmit(signinForm: NgForm) {
  //   if (signinForm.invalid) {
  //     return; // Stop if form is invalid
  //   }

  //   const credentials = {
  //     email: signinForm.value.email,
  //     password: signinForm.value.password
  //   };

  //   this.userService.signIn(credentials).subscribe(
  //     (response) => {
  //       console.log('Login Successful:', response);
  //       alert('Login Successful!'); // You can navigate to another page here
  //     },
  //     (error) => {
  //       console.error('Login Failed:', error);
  //       this.errorMessage = 'Invalid email or password!';
  //     }
  //   );
  // }

