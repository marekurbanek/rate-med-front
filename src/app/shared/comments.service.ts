import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IComment } from '../doctors/comments/comment';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  // TODO: Add comment model and use it in service
  private commentsUrl: string = 'http://localhost:5000/comments';

  constructor (private http: HttpClient) { }


  removeComment(id: number): Observable<{}> {
    const url = `${this.commentsUrl}/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError))
  }

  getCommentsByDoctorId(doctorId: number): Observable<IComment[]> {
    const url = `${this.commentsUrl}/${doctorId}`;
    return this.http.get<IComment[]>(url)
      .pipe(catchError(this.handleError))
  }

  addComment(doctorId: number, comment: string, rating: number): Observable<{}> {
    const url = `${this.commentsUrl}`;
    return this.http.post(url, {doctorId, comment, rating})
      .pipe(catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err);
    return of(err.error.errorMessage);
  }
}
