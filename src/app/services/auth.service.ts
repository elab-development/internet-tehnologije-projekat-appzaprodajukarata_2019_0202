import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string = 'http://localhost:8000/api/login';
  constructor(private http: HttpClient) { }

  login(user:User):Observable<any> {
    return this.http.post(this.url, user);
  }
}
