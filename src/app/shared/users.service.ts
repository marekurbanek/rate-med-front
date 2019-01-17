import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl: string = 'http://localhost:5000/users';

  constructor (private http: HttpClient) { }

  register(user): Observable<{}> {
    const url = `${this.usersUrl}/register`;
    console.log(user)
    return this.http.post(url, user)
      .pipe(catchError(this.handleError))
  }

  login(user): Observable<{}> {
    const url = `${this.usersUrl}/login`;
    return this.http.post(url, user)
      .pipe(catchError(this.handleError))
  }

  testSomething(): Observable<{}> {
    const url = `${this.usersUrl}`;
    return this.http.get(url)
      .pipe(catchError(this.handleError))
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error ocurred: ${err.error.message}`
    } else {
      errorMessage = `Server returned code ...`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
