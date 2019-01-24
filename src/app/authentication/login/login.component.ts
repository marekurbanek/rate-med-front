import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isRegistering: boolean = false;
  username: string = '';
  password: string = '';
  errorMessage: string;
  
  constructor(private usersService: UsersService,
              private router: Router) { }

  registerUser(): void {
    let user = {
      username: this.username,
      password: this.password
    };
    this.usersService.register(user).subscribe((res) => {
      if(res.error) {
        this.errorMessage = res.error.errorMessage;
      } else {
        this.authSuccess(res);
      }
    })
  }

  loginUser(): void {
    let user = {
      username: this.username,
      password: this.password
    };
    this.usersService.login(user).subscribe((res) => {
      if(res.error) {
        this.errorMessage = res.error.errorMessage;
      } else {
        this.authSuccess(res);
      }
    })
  }

  authSuccess(res): void {
    localStorage.setItem('token', res.token.toString());
    this.usersService.logoutAfterTokenExpire(res.expirationTime);
    this.usersService.setUser({username: res.username, userId: res.userId});
    this.errorMessage = '';
    this.router.navigate(['/doctors']);
  }

  toggleRegister(): void {
    this.isRegistering = !this.isRegistering;
  }

  ngOnInit() {
  }

}
