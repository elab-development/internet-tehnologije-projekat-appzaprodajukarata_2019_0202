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
  isLoading: boolean = false;
  error: string = "";
  isSignUp = false;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;

    this.isLoading = true;

    if (this.isSignUp) {
      this.authService.signUp(email, password, name).subscribe(
        (data: any) => {
          console.log(data);
          this.isLoading = false;
          this.router.navigate(['/events']); // Preusmeravanje na events stranicu
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
          this.error = error.message; // Prikazivanje greške ako postoji
        }
      );
    } else {
      this.authService.logIn(email, password).subscribe(
        (data: any) => {
          console.log(data);
          this.isLoading = false;
          this.router.navigate(['/events']); // Preusmeravanje na events stranicu
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
          this.error = error.message; // Prikazivanje greške ako postoji
        }
      );
    }

    form.reset();
  }
  logout() {
    this.authService.logOut(); // Metoda za odjavljivanje
    this.router.navigate(['/events']); // Preusmeravanje na events stranicu nakon odjavljivanja
    this.isLoggedIn = false; // Ažuriranje statusa prijavljenosti
  }
  switchButtonClicked() {
    this.isSignUp = !this.isSignUp;
    if (this.isSignUp) {
      document.getElementById("loginButton")!.innerText = "Sign Up";
      document.getElementById("switchButton")!.innerText = "Switch to Login";
    } else {
      document.getElementById("loginButton")!.innerText = "Login";
      document.getElementById("switchButton")!.innerText = "Switch to Sign Up";
    }
  }
}
