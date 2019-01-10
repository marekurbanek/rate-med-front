import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { CommentsComponent } from './comments/comments.component';
import { SharedModule } from '../shared/shared.module';
import { DoctorAddComponent } from './doctor-add/doctor-add.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'doctors', component: DoctorsListComponent },
      { path: 'doctors/:id', component: DoctorDetailsComponent }
    ]),
    FormsModule,
    SharedModule
  ],
  declarations: [DoctorsListComponent, DoctorDetailsComponent, CommentsComponent, DoctorAddComponent],
})
export class DoctorsModule { }
