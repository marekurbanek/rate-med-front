import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/shared/services/doctors.service';
import { IDoctor } from '../../shared/models/doctor';
import { IComment } from 'src/app/shared/models/comment';
import { CommentsService } from 'src/app/shared/services/comments.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit {

  doctors: IDoctor[];
  filteredDoctors: IDoctor[];
  allSpecialities;
  selectedSpeciality = 'Show all';
  filterName = '';

  constructor (private doctorsService: DoctorsService,
              private commentsService: CommentsService) { }

  getDoctorsList(): void {
    this.doctorsService.getDoctors().subscribe(
      doctors => {
        this.doctors = doctors;
        this.filteredDoctors = doctors;
        this.addLastCommentToDoctors();
        this.allSpecialities = this.allSpecialities ? this.allSpecialities : this.getAllSpecialities(doctors);
      }
    );
  }

  getAllSpecialities(doctors) {
    const specialities = doctors.map(doctor => doctor.speciality);
    const merged = [].concat.apply([], specialities);
    const unique = Array.from(new Set(merged));
    unique.unshift('Show all');
    return unique;
  }

  addLastCommentToDoctors() {
    this.commentsService.getLatestComments().subscribe(comments => {
      comments.forEach(comment => {
        this.doctors.find(doc => doc.id === comment.doctorId).lastComment = comment.text;
      });
    });
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

  filter(doctors: IDoctor[], filterBy: string, filterValue: string) {
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
