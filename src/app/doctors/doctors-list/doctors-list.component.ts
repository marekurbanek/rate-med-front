import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import { IDoctor } from '../../shared/models/doctor';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit {

  doctors: IDoctor[];
  filteredDoctors: IDoctor[];
  allSpecialities: string[];
  selectedSpeciality: string;
  filterName = '';

  constructor (private doctorsService: DoctorsService) { }

  getDoctorsList(): void {
    this.doctorsService.getDoctors().subscribe(
      doctors => {
        this.doctors = doctors;
        this.filteredDoctors = doctors;
        this.allSpecialities = this.allSpecialities ? this.allSpecialities : this.getAllSpecialities(doctors);
      }
    );
  }

  getAllSpecialities(doctors): string[] {
    const specialities = doctors.map(doctor => doctor.speciality);
    const merged = [].concat.apply([], specialities);
    merged.unshift('Show all');
    return merged;
  }

  setSpeciality(speciality: string): void {
    this.selectedSpeciality = speciality;
    this.filterBySpeciality();
  }

  filterBySpeciality(): void {
    if (this.selectedSpeciality === 'Show all') {
      this.filteredDoctors = this.doctors;
    } else {
      this.filteredDoctors = this.filter(this.doctors, 'speciality', this.selectedSpeciality);
    }
  }

  filterByName() {
    if (this.filterName.length === 0) {
      this.filterBySpeciality();
    } else {
      this.filteredDoctors = this.filter(this.filteredDoctors, 'name', this.filterName);
    }
  }

  filter(doctors, filterBy, filterValue) {
    return doctors.filter(doctor => {
      let isMatching = false;
      if (Array.isArray(doctor[filterBy])) {
        doctor[filterBy].forEach(speciality => {
          if (speciality.includes(filterValue)) {
            isMatching = true;
          }
        });
      } else {
        isMatching = doctor[filterBy].toLowerCase().includes(filterValue.toLowerCase());
      }
      return isMatching;
    });
  }

  ngOnInit(): void {
    this.getDoctorsList();
  }
}
