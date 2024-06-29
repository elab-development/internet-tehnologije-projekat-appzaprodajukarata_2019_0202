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
    const token = localStorage.getItem('token');
    return this.http.post<any>(this.logoutUrl, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap(() => {
        this.clearAuthentication();
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        if (error.status === 401) {
          // Ako dobijete 401 grešku, jasno je da korisnik nije autentifikovan.
          console.error('Logout failed: Unauthorized');
          this.clearAuthentication();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const userEmail = localStorage.getItem('userEmail');
    return userEmail === 'admin@gmail.com'; 
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
  


  resetPassword(email: string, password: string, passwordConfirmation: string): Observable<any> {
    return this.http.post<any>(this.resetPasswordUrl, { 
      email, 
      password, 
      password_confirmation: passwordConfirmation 
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  getUserId(): Observable<number> {
    // Ovde implementirajte logiku za dobijanje ID-ja trenutno prijavljenog korisnika
    // Na primer, možete napraviti HTTP zahtev prema vašem backendu
    return this.http.get<number>(`${this.baseUrl}/user-id`);
  }

}
