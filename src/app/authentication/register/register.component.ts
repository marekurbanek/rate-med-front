import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private usersService: UsersService) { }

  registerUser(): void {
    this.usersService.addUser({username: this.username, password: this.password}).subscribe((token) => {
      localStorage.setItem('token', token.toString())
    })
  }

  ngOnInit() {
  }

}
