import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';
import { EventsComponent } from './events/events.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TicketSport';
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigateByUrl('/login'); // Promenite '/login' ako je ruta za login drugačija
  }
}
