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
      doctors => {
        this.doctors = doctors;
      },
      error => console.log(error)
    );
  }

  ngOnInit(): void {
    this.getDoctorsList();
  }
}
