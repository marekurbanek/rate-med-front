import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { LoginComponent } from '../authentication/login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';


@NgModule({
  imports: [
    CommonModule,
    StarRatingModule.forRoot(),
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
    ]),
    FormsModule
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  exports: [
    StarRatingModule,
    LoginComponent,
    FormsModule
  ]
})
export class SharedModule { }
