import { Component, OnInit, Input } from '@angular/core';
import { IComment } from './comment';
import { DoctorsService } from 'src/app/shared/doctors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingChangeEvent } from 'angular-star-rating';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Array<IComment>;
  newComment: string = '';
  rating: number;

  constructor(private doctorsService: DoctorsService,
    private route: ActivatedRoute,
    private router: Router) {}

  addComment(): void {
    const doctorId = this.route.snapshot.params['id'];
    this.doctorsService.addComment(doctorId, this.newComment, this.rating).subscribe(() => {
      this.getComments();
    })
  }

  ngOnInit() {
    this.getComments();
  }

  getComments(): void {
    const doctorId = this.route.snapshot.params['id'];
    this.doctorsService.getCommentsByDoctorId(doctorId).subscribe(comments => {
      this.comments = comments;
    })
  }

  onRatingChange($event: RatingChangeEvent) {
    this.rating = $event.rating;
  };

}
