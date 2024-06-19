import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginMode = true;
  fullName: string = '';
  loginUsername: string = '';
  loginPassword: string = '';
  registerUsername: string = '';
  email: string = '';
  registerPassword: string = '';

  onLoginSubmit() {
    // Implementirajte logiku za obradu login forme
    console.log('Login form submitted');
    console.log('Username:', this.loginUsername);
    console.log('Password:', this.loginPassword);
  }

  onRegisterSubmit() {
    // Implementirajte logiku za obradu registracije
    console.log('Register form submitted');
    console.log('Full Name:', this.fullName);
    console.log('Username:', this.registerUsername);
    console.log('Email:', this.email);
    console.log('Password:', this.registerPassword);
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}

