import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isSignUp = false;
  resetPasswordMode = false;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
  
    const email = form.value.email;
    const password = form.value.password;
  
    this.isLoading = true;
  
    if (this.isSignUp) {
      const name = form.value.name;
      this.authService.signUp(name, email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (errMessage) => {
          this.error = errMessage;
          this.isLoading = false;
        }
      });
    } else if (this.resetPasswordMode) {
      const newPassword = form.value.newPassword;
      const confirmPassword = form.value.confirmPassword;
  
      if (newPassword !== confirmPassword) {
        this.error = 'Passwords do not match!';
        this.isLoading = false;
        return;
      }
  
      this.authService.resetPassword(email, newPassword, confirmPassword).subscribe({
        next: () => {
          this.isLoading = false;
          this.resetPasswordMode = false;
          this.router.navigate(['/login']);
        },
        error: (errMessage) => {
          this.error = errMessage;
          this.isLoading = false;
        }
      });
    } else {
      this.authService.logIn(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (errMessage) => {
          this.error = errMessage;
          this.isLoading = false;
        }
      });
    }
  
    form.reset();
  }
  

  switchToLogin() {
    this.isSignUp = false;
    this.resetPasswordMode = false;
    this.error = null;
  }

  switchToSignUp() {
    this.isSignUp = true;
    this.resetPasswordMode = false;
    this.error = null;
  }

  switchToResetPassword() {
    this.resetPasswordMode = true;
    this.isSignUp = false;
    this.error = null;
  }
}
