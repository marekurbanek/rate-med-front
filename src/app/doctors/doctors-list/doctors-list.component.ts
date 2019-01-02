import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/shared/doctors.service';
import { IDoctor } from '../doctor';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {
  
  doctors: IDoctor[];

  constructor(private doctorsService: DoctorsService) { }

  ngOnInit(): void {
    this.doctorsService.getDoctors().subscribe(
      doctors => {
        this.doctors = doctors
      },
      error => console.log(error)
    );
  }

}
