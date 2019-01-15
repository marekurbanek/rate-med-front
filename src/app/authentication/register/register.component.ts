import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  login: string = '';
  password: string = '';

  constructor() { }

  registerUser(): void {
    console.log(this.login)
    console.log(this.password)
  }

  ngOnInit() {
  }

}
