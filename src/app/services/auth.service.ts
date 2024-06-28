import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponseData } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signupUrl = 'http://127.0.0.1:8000/api/users';
  private loginUrl = 'http://127.0.0.1:8000/api/login';
  private logoutUrl = 'http://127.0.0.1:8000/api/logout';

  constructor(private http: HttpClient, private router: Router) { }

  signUp(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.signupUrl, { name, email, password }).pipe(
      tap(
        (resData: any) => {
          this.handleAuthentication(resData.email, resData.userId, resData.token, resData.expiresIn);
        }
      ),
      catchError(this.handleError)
    );
  }

  logIn(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.loginUrl, { email, password }).pipe(
      tap(
        (resData: AuthResponseData) => {
          if (resData && resData.token) {
            this.handleAuthentication(resData.email, resData.userId, resData.token, resData.expiresIn);
          } else {
            console.error('Invalid server response after login:', resData);
          }
        },
        (error: any) => {
          console.error('Error logging in:', error);
          if (error.status === 422) {
            const errorMessage = 'Invalid credentials. Please try again.';
            return throwError(errorMessage);
          } else {
            return throwError('Unknown error occurred during login.');
          }
        }
      )
    );
  }

  logOut(): Observable<any> {
    return this.http.post<any>(this.logoutUrl, {}).pipe(
      tap(() => {
        this.clearAuthentication(); // Clear authentication data locally
        this.router.navigate(['/login']); // Redirect to login page after logout
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists in local storage
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    localStorage.setItem('token', token); // Example: Store token in local storage
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    let errorMessage = 'Unknown error occurred.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = this.extractErrorMessage(error);
    }
    console.error(errorMessage);
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
    localStorage.removeItem('token'); // Example: Remove token from local storage
  }
}
