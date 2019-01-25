import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/shared/doctors.service';
import { IDoctor } from '../doctor';
import { IComment } from '../comments/comment';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit {

  doctors: IDoctor[];

  constructor (private doctorsService: DoctorsService) { }

  getDoctorsList(): void {
    this.doctorsService.getDoctors().subscribe(
      response => {
        this.doctors = this.getDoctors(response);
      }
    );
  }

  getDoctors(doctorsResponse): IDoctor[] {
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

    return distinctDoctors
  }

  ngOnInit(): void {
    this.getDoctorsList();
  }
}
