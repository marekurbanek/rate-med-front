import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';

@NgModule({
  imports: [
    CommonModule,
    StarRatingModule.forRoot(),
  ],
  declarations: [],
  exports: [
    StarRatingModule
  ]
})
export class SharedModule { }
