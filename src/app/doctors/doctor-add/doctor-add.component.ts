import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html'
})
export class DoctorAddComponent implements OnInit {
  @Output() doctorAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  doctorForm: FormGroup;

  isShowingForm = false;
  profileImage: File;

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
    // TODO Find better way to handle doctor form as whole
    const fd = new FormData();
    fd.append('profileImage', this.profileImage);
    fd.append('name', this.doctorForm.value.name);
    fd.append('specialities', this.doctorForm.value.specialities);

    this.doctorsService.addDoctor(fd).subscribe(() => {
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

  fileUploaded(event: any) {
    this.profileImage = event.srcElement.files[0];
  }
}
