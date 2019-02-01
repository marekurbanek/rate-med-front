import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DoctorsService } from 'src/app/shared/doctors.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css']
})
export class DoctorAddComponent implements OnInit {
  @Output() doctorAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  doctorForm: FormGroup;

  isShowingForm = false;

  constructor (private doctorsService: DoctorsService,
    private fb: FormBuilder) { }

  get specialities() {
    return this.doctorForm.get('specialities') as FormArray;
  }

  toggleFormVisibility(): void {
    this.isShowingForm = !this.isShowingForm;
  }

  atDoctorAdded(): void {
    this.clearFields();
    this.doctorAdded.emit();
    this.isShowingForm = false;
  }

  clearFields(): void {
    this.doctorForm.reset();
  }

  onSubmit(): void {
    this.doctorsService.addDoctor(this.doctorForm.value).subscribe(() => {
      this.atDoctorAdded();
    });
  }

  addSpeciality(): void {
    this.specialities.push(this.fb.control('', [Validators.required]));
  }

  removeSpeciality(index: number): void {
    this.specialities.removeAt(index);
  }

  ngOnInit() {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      specialities: this.fb.array([
        this.fb.control('', [Validators.required])
      ])
    });
  }

}
