import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import { IDoctor } from '../../shared/models/doctor';
import { IComment } from '../../shared/models/comment';
import { UsersService } from 'src/app/shared/services/users.service';
import { isArray } from 'util';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit {

  doctors: IDoctor[];
  filteredDoctors: IDoctor[];
  allSpecialities: string[];
  selectedFilter: string;

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

  setFilter(speciality: string): void {
    this.selectedFilter = speciality;
    this.filterDoctors();
  }

  filterDoctors(): void {
    if (this.selectedFilter === 'Show all') {
      this.filteredDoctors = this.doctors;
    } else {
      this.filteredDoctors = this.doctors.filter(this.filterMatches, this.selectedFilter);
    }
  }

  filterMatches(doctor) {
    let isMatching = false;

    doctor.speciality.forEach(speciality => {
      if (speciality === this) {
        isMatching = true;
      }
    });

    return isMatching;
  }

  ngOnInit(): void {
    this.getDoctorsList();
  }
}
