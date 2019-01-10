import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DoctorsListComponent } from './doctors-list/doctors-list.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { CommentsComponent } from './comments/comments.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'doctors', component: DoctorsListComponent },
      { path: 'doctor/:id', component: DoctorDetailsComponent }
    ]),
    SharedModule
  ],
  declarations: [DoctorsListComponent, DoctorDetailsComponent, CommentsComponent]
})
export class DoctorsModule { }
