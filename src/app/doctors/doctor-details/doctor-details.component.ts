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
      this.doctor = this.getDoctors(doctor);
      console.log(this.doctor)
    });
  }

  getDoctors(doctorsResponse) {
    const removeDuplicates = (myArr, prop) => {
      return myArr.filter((obj, pos, arr) => arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos);
    }

    let distinctDoctors = removeDuplicates(doctorsResponse, 'id')

    let specialities = doctorsResponse.map(doctor => {
      return {
        doctorId: doctor.id,
        speciality: doctor.speciality
      }
    })

    specialities.forEach(spec => {
      let doctor = distinctDoctors.find( doctor => doctor.id === spec.doctorId)
      if(typeof doctor.speciality === 'string') {
        doctor.speciality = [`${spec.speciality}`]
      } else {
        doctor.speciality.push(spec.speciality)
      }
    })

    return distinctDoctors[0]
  }

}
