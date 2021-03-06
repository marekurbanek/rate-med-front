import { Component, OnInit, Input } from '@angular/core';
import { DoctorsService } from 'src/app/shared/doctors.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IDoctor } from '../doctor';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent implements OnInit {
  doctor: IDoctor;
  rating: number;

  constructor (private doctorsService: DoctorsService,
    private route: ActivatedRoute,
    private router: Router) { }

  removeDoctor(): void {
    const id = this.route.snapshot.params['id'];
    this.doctorsService.removeDoctor(id).subscribe(() => {
      this.router.navigate(['/doctors']);
    })
  }

  ratingCalculated(rating: number): void {
    this.rating = rating;
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.doctorsService.getDoctor(id).subscribe((doctor) => {
      this.doctor = doctor;
    });
  }

}
