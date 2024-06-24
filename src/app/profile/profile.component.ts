import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private UserService: UserService) { }
  userDate: any;

  ngOnInit(): void {
    this.UserService.getProfile().subscribe(res => {
      this.userDate = res;
    })
  }
}
