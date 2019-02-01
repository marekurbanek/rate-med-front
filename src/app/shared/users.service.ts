import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'http://localhost:5000/users';
  username: string;
  userId: number;


  constructor (private http: HttpClient,
              private router: Router) { }

  register(user): Observable<any> {
    const url = `${this.usersUrl}/register`;
    return this.http.post(url, user)
      .pipe(catchError(this.handleError));
  }

  login(user): Observable<any> {
    const url = `${this.usersUrl}/login`;
    return this.http.post(url, user)
      .pipe(catchError(this.handleError));
  }

  setUser(user): void {
    this.username = user.username;
    this.userId = user.userId;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.username = '';
    this.userId = null;
    this.router.navigate(['/doctors']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logoutAfterTokenExpire(expirationTime): void {
    // TODO: Expiration Time should be passed and processed as exp Date
    const expTimeMs = expirationTime * 1000;
    setTimeout(this.logout, expTimeMs);
  }

  getUserData() {
    return {
      username: this.username,
      userId: this.userId
    };
  }

  fetchUserData(): Observable<any> {
    const url = `${this.usersUrl}/data`;
    return this.http.get(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return of(err);
  }
}
