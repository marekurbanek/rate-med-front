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
    this.usersService.register({username: this.username, password: this.password}).subscribe((token) => {
      localStorage.setItem('token', token.toString());
      this.router.navigate(['/doctors']);
    })
  }

  loginUser(): void {
    this.usersService.login({username: this.username, password: this.password}).subscribe((token) => {
      localStorage.setItem('token', token.toString());
      this.router.navigate(['/doctors']);
    })
  }

  toggleRegister(): void {
    this.isRegistering = !this.isRegistering;
  }

  ngOnInit() {
  }

}
