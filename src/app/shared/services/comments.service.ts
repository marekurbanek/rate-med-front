import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IComment } from '../models/comment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { IResponse } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private commentsUrl = 'http://localhost:5000/comments';

  constructor (private http: HttpClient) { }


  removeComment(id: number): Observable<{}> {
    const url = `${this.commentsUrl}/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError));
  }

  getCommentsByDoctorId(doctorId: number): Observable<IComment[]> {
    const url = `${this.commentsUrl}/${doctorId}`;
    return this.http.get<IComment[]>(url)
      .pipe(
        map( response => {
          response.forEach(comment => {
            comment.created = new Date(Date.parse(comment.created)).toLocaleString();
          });
          return response;
        }),
        catchError(this.handleError));
  }

  getLatestComments(): Observable<IComment[]> {
    const url = `${this.commentsUrl}/latest`;
    return this.http.get<IComment[]>(url)
      .pipe(catchError(this.handleError));
  }

  addComment(doctorId: number, comment: string, rating: number): Observable<IResponse> {
    const url = `${this.commentsUrl}`;
    return this.http.post(url, {doctorId, comment, rating})
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return of(err.error.errorMessage);
  }
}
