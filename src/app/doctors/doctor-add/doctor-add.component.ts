import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DoctorsService } from 'src/app/shared/doctors.service';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {
  @Output() doctorAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  name: string = '';
  speciality: string = '';
  image: string = '';

  isShowingForm: boolean = false;

  constructor(private doctorsService: DoctorsService) { }

  toggleFormVisibility(): void {
    this.isShowingForm = !this.isShowingForm;
  }

  addNewDoctor(): void {
    let doctor = {
      name: this.name,
      speciality: this.speciality,
      image: this.image
    }
    this.doctorsService.addDoctor(doctor).subscribe(() => {
      this.atDoctorAdded();
    });
  }

  atDoctorAdded(): void {
    this.clearFields();
    this.doctorAdded.emit();
    this.isShowingForm = false;
  }

  clearFields(): void {
    this.name = '';
    this.speciality = '';
    this.image = '';
  }

  ngOnInit() {
  }

}
