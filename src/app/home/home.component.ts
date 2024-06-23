import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../models/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(private router: Router) {}
  backgroundImageUrl = 'assets/pozadina.png';
  navigateToLogin() {
    this.router.navigateByUrl('/login'); // Prilagodite putanju prema vašim potrebama
  }
}
