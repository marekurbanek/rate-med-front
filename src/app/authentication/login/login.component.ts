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

  constructor(private usersService: UsersService,
              private router: Router) { }

  registerUser(): void {
    this.usersService.register({username: this.username, password: this.password}).subscribe((res) => {
      this.authSuccess(res)
    })
  }

  loginUser(): void {
    this.usersService.login({username: this.username, password: this.password}).subscribe((res) => {
      this.authSuccess(res)
    })
  }

  authSuccess(res): void {
    localStorage.setItem('token', res.token.toString());
    this.usersService.logoutAfterTokenExpire(res.expirationTime)
    this.router.navigate(['/doctors']);
  }

  toggleRegister(): void {
    this.isRegistering = !this.isRegistering;
  }

  ngOnInit() {
  }

}
