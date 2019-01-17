import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isRegistering: boolean = false;
  username: string = '';
  password: string = '';

  constructor(private usersService: UsersService) { }

  registerUser(): void {
    console.log(this.username)
    console.log(this.password)
    this.usersService.register({username: this.username, password: this.password}).subscribe((token) => {
      localStorage.setItem('token', token.toString());
    })
  }

  loginUser(): void {
    this.usersService.login({username: this.username, password: this.password}).subscribe((token) => {
      localStorage.setItem('token', token.toString());
    })
  }

  toggleRegister(): void {
    this.isRegistering = !this.isRegistering;
  }

  ngOnInit() {
  }

}
