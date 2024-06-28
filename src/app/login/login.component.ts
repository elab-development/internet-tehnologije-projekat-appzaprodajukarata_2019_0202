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
  isLoading = false;
  error: string | null = null;
  resetPasswordMode = false;
  newPassword: string = '';
  confirmPassword: string = '';

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
      this.authService.resetPassword(email, this.newPassword).subscribe({
        next: () => {
          this.isLoading = false;
          this.error = null;
          this.resetPasswordMode = false;
          this.newPassword = '';
          this.confirmPassword = '';
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

  switchButtonClicked() {
    this.isSignUp = !this.isSignUp;
    this.resetPasswordMode = false;
    this.error = null;
  }

  showResetPasswordForm() {
    this.resetPasswordMode = true;
    this.error = null;
  }

  backToLogin() {
    this.resetPasswordMode = false;
    this.error = null;
  }
}
