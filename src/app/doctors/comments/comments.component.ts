import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
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
  @Output() getComments: EventEmitter<number> = new EventEmitter<number>();
  @Input() comments: IComment[];

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
      if (response.error) {
        this.errorMessage = response.toString();
        return;
      }
      this.newComment = '';
      this.rating = 0;
      this.getNewComments();
    });
  }

  ngOnInit() {
    this.getUserId();
    this.comments.forEach(comment => {
      comment.created = new Date(Date.parse(comment.createdAt)).toLocaleString();
    })
  }

  getNewComments() {
    this.getComments.emit();
  }

  removeComment(id: number) {
    this.commentsService.removeComment(id).subscribe(comments => {
      this.getNewComments();
    });
  }

  onRatingChange($event: RatingChangeEvent) {
    this.rating = $event.rating;
  }

  getUserId(): void {
    this.currentUserID = this.usersService.getUserData().userId;
  }

}
