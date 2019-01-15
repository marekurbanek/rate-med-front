import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl: string = 'http://localhost:5000/users';

  constructor (private http: HttpClient) { }

  addUser(user): Observable<{}> {
    return this.http.post(this.usersUrl, user)
      .pipe(catchError(this.handleError))
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
