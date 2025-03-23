import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  formSubmitted = false;
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UsersService, private router: Router) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/)
      ]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  // ✅ Custom Validator for Matching Passwords
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    // ✅ Only show "passwordMismatch" if the confirmPassword field has been touched
    if (!confirmPassword) {
      return null; // Don't show any error if confirm password is empty
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get formControls() {
    return this.signupForm.controls;
  }

  handelSignUp() {
    this.formSubmitted = true;
    
    if (this.signupForm.invalid) {
      console.log("❌ Form is invalid. Fix errors before submitting.");
      return;
    }
    const { name, email, password } = this.signupForm.value;

    this.userService.signUp({ name, email, password }).subscribe(
      (response) => {
        console.log('Sign-Up Successful:', response);
        this.successMessage = "Account created successfully!";
        setTimeout(() => {
          this.router.navigate(['/sign-in']); // ✅ Redirect to Sign-In page after success
        }, 2000);
      },
      (error) => {
        console.error('Sign-Up Failed:', error);
        this.errorMessage = error.error.message || "Registration failed. Please try again.";
      }
    );
  }
}
