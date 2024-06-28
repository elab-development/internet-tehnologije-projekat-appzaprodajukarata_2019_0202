import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupUrl = 'http://127.0.0.1:8000/api/register';
  private loginUrl = 'http://127.0.0.1:8000/api/login';
  private logoutUrl = 'http://127.0.0.1:8000/api/logout';
  private forgotPasswordUrl = 'http://127.0.0.1:8000/api/forgot-password';
  private resetPasswordUrl = 'http://127.0.0.1:8000/api/reset-password';
   private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  signUp(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.signupUrl, { name, email, password }).pipe(
      tap(
        (resData: any) => {
          this.handleAuthentication(resData.user.email, resData.user.id, resData.token);
        }
      ),
      catchError(this.handleError)
    );
  }

  logIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { email, password }).pipe(
      tap(
        (resData: any) => {
          this.handleAuthentication(resData.user.email, resData.user.id, resData.token);
        }
      ),
      catchError(this.handleError)
    );
  }

  logOut(): Observable<any> {
    return this.http.post<any>(this.logoutUrl, {}).pipe(
      tap(() => {
        this.clearAuthentication();
        this.router.navigate(['/login']);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const userEmail = localStorage.getItem('userEmail');
    return userEmail === 'admin@gmail.com'; // Prilagodite ovde ako postoji drugačija logika za proveru admina
  }

  private handleAuthentication(email: string, userId: string, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userId', userId);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = this.extractErrorMessage(error);
    }
    return throwError(errorMessage);
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown server error.';
    if (error.error && error.error.message) {
      errorMessage = `${error.error.message}`;
    } else if (error.message) {
      errorMessage = error.message;
    }
    return errorMessage;
  }

  private clearAuthentication() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
  }
  
  // auth.service.ts
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(this.forgotPasswordUrl, { email });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    const url = `${this.resetPasswordUrl}`;
    return this.http.post<any>(url, { email, newPassword }).pipe(
      tap(() => {
        // Opcionalno: Dodati logiku nakon uspešnog resetovanja lozinke
      }),
      catchError(this.handleError) // Dodati obradu grešaka
    );
  }

}
