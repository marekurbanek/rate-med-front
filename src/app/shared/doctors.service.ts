import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IDoctor } from '../doctors/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private doctorsUrl: string = 'http://localhost:5000/doctors';

  constructor (private http: HttpClient) { }

  getDoctors(): Observable<IDoctor[]> {
    return this.http.get<IDoctor[]>(this.doctorsUrl)
      .pipe(catchError(this.handleError))
  }

  getDoctor(id: number): Observable<IDoctor> {
    const url = `${this.doctorsUrl}/${id}`;
    return this.http.get<IDoctor>(url)
      .pipe(catchError(this.handleError))
  }

  addDoctor(doctor): Observable<IDoctor> {
    return this.http.post<IDoctor>(this.doctorsUrl, doctor)
      .pipe(catchError(this.handleError))
  }

  removeDoctor(id: number): Observable<{}> {
    const url = `${this.doctorsUrl}/${id}`;
    return this.http.delete(url)
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
