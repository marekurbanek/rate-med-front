import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/shared/doctors.service';
import { IDoctor } from '../doctor';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit {
  
  doctors: IDoctor[];

  constructor(private doctorsService: DoctorsService) { }

  getLastComment(id: number): string {
    let comment = this.doctors[id - 1].comments[this.doctors[id - 1].comments.length - 1].comment)
    return comment
  }

  ngOnInit(): void {
    this.doctorsService.getDoctors().subscribe(
      doctors => {
        this.doctors = doctors
      },
      error => console.log(error)
    );
  }

}
