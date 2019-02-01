import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IDoctor } from '../doctors/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private doctorsUrl = 'http://localhost:5000/doctors';

  constructor (private http: HttpClient) { }

  getDoctors(): Observable<IDoctor[]> {
    return this.http.get<IDoctor[]>(this.doctorsUrl)
      .pipe(catchError(this.handleError));
  }

  getDoctor(id: number): Observable<IDoctor> {
    const url = `${this.doctorsUrl}/${id}`;
    return this.http.get<IDoctor>(url)
      .pipe(catchError(this.handleError));
  }

  addDoctor(doctor): Observable<{}> {
    return this.http.post(this.doctorsUrl, doctor)
      .pipe(catchError(this.handleError));
  }

  removeDoctor(id: number): Observable<{}> {
    const url = `${this.doctorsUrl}/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError));
  }


  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return of(err.error.errorMessage);
  }
}
