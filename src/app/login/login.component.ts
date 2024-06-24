import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  get emailFormControl() {

    return this.loginForm.get('email') as FormControl;
  }
  get passwordFormControl() {
    return this.loginForm.get('password') as FormControl;
  }

  constructor(private fb: FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  onSubmit() {
    if(this.loginForm.valid) this.authService
    .login(this.loginForm.value)
    .subscribe((res)=>localStorage.setItem('token', res.access_token));
  }

}
