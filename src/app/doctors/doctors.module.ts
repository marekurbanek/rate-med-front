import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DoctorsListComponent } from './doctors-list/doctors-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'doctors', component: DoctorsListComponent },
    ])
  ],
  declarations: [DoctorsListComponent]
})
export class DoctorsModule { }
