import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { IComment } from './comment';
import { DoctorsService } from 'src/app/shared/doctors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingChangeEvent } from 'angular-star-rating';
import { NumberValueAccessor } from '@angular/forms/src/directives';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Output() averageRatingCalculated: EventEmitter<number> = new EventEmitter<number>();

  comments: IComment[];
  newComment: string = '';
  rating: number;
  averageRating: number;
  currentUserID: number;

  constructor (private doctorsService: DoctorsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  addComment(): void {
    const doctorId = this.route.snapshot.params['id'];
    this.doctorsService.addComment(doctorId, this.newComment, this.rating).subscribe(() => {
      this.getComments();
      this.newComment = '';
      this.rating = 0;
    })
  }

  ngOnInit() {
    this.getComments();
    this.getUserId();
  }

  getComments(): void {
    const doctorId = this.route.snapshot.params['id'];
    this.doctorsService.getCommentsByDoctorId(doctorId).subscribe(comments => {
      this.comments = comments;
      this.calculateAverageRating(comments);
    })
  }

  removeComment(id: number) {
    this.doctorsService.removeComment(id).subscribe(comments => {
      this.getComments();
    })
  }

  calculateAverageRating(comments: IComment[]): void {
    let sumOfAllRatings = comments.reduce((accumulator, currentVal) => {
      return accumulator + currentVal.rating;
    }, 0)
    let averageRating = sumOfAllRatings / comments.length;
    this.averageRatingCalculated.emit(averageRating);
  }


  onRatingChange($event: RatingChangeEvent) {
    this.rating = $event.rating;
  };

  getUserId(): void {
    this.usersService.getUserData().subscribe(user => {
      this.currentUserID = user.userId
    })
  }

}
