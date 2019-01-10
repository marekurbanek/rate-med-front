import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { IDoctor } from '../doctors/doctor';
import { IComment } from '../doctors/comments/comment';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  private doctorsUrl: string = 'http://localhost:5000/doctors';
  private commentsUrl: string = 'http://localhost:5000/comments';

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

  addDoctor(doctor): Observable<{}> {
    return this.http.post(this.doctorsUrl, doctor)
      .pipe(catchError(this.handleError))
  }

  removeDoctor(id: number): Observable<{}> {
    const url = `${this.doctorsUrl}/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError))
  }

  getCommentsByDoctorId(doctorId: number): Observable<IComment[]> {
    const url = `${this.commentsUrl}/${doctorId}`;
    return this.http.get<IComment[]>(url)
      .pipe(catchError(this.handleError))
  }

  addComment(doctorId: number, comment: string): Observable<{}> {
    const url = `${this.commentsUrl}`;
    return this.http.post(url, {doctorId, comment})
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
