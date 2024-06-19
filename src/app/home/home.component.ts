import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}
  backgroundImageUrl = 'assets/pozadina.jpg';
  navigateToLogin() {
    this.router.navigateByUrl('/login'); // Prilagodite putanju prema vašim potrebama
  }
}
