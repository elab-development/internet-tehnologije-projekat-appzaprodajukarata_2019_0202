import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Prilagodite putanju prema stvarnom mestu servisa
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logOut().subscribe(() => {
      this.router.navigate(['/login']); // Redirect to login page after logout
    });
  }
}
