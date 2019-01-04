import { Component, OnInit } from '@angular/core';
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

  constructor(private doctorsService: DoctorsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id']
    this.doctorsService.getDoctors().subscribe(
      doctors => {
        this.doctor = doctors[id - 1];
      }
    )
  }

}
