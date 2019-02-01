import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { IComment } from '../../shared/models/comment';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingChangeEvent } from 'angular-star-rating';
import { UsersService } from 'src/app/shared/services/users.service';
import { CommentsService } from 'src/app/shared/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Output() averageRatingCalculated: EventEmitter<number> = new EventEmitter<number>();

  comments: IComment[];
  newComment = '';
  rating: number;
  averageRating: number;
  currentUserID: number;
  errorMessage: string;

  constructor (private usersService: UsersService,
              private route: ActivatedRoute,
              private commentsService: CommentsService) { }

  addComment(): void {
    const doctorId = this.route.snapshot.params['id'];
    this.commentsService.addComment(doctorId, this.newComment, this.rating).subscribe((response) => {
      if (response) {
        this.errorMessage = response.toString();
        return;
      }
      this.getComments();
      this.newComment = '';
      this.rating = 0;
    });
  }

  ngOnInit() {
    this.getComments();
    this.getUserId();
  }

  getComments(): void {
    const doctorId = this.route.snapshot.params['id'];
    this.commentsService.getCommentsByDoctorId(doctorId).subscribe(comments => {
      this.comments = comments;
      this.calculateAverageRating(comments);
    });
  }

  removeComment(id: number) {
    this.commentsService.removeComment(id).subscribe(comments => {
      this.getComments();
    });
  }

  calculateAverageRating(comments: IComment[]): void {
    const sumOfAllRatings = comments.reduce((accumulator, currentVal) => {
      return accumulator + currentVal.rating;
    }, 0);
    const averageRating = sumOfAllRatings / comments.length;
    this.averageRatingCalculated.emit(averageRating);
  }


  onRatingChange($event: RatingChangeEvent) {
    this.rating = $event.rating;
  }

  getUserId(): void {
    this.currentUserID = this.usersService.getUserData().userId;
  }

}
