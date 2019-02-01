import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  isRegistering = false;
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private usersService: UsersService,
              private router: Router,
              private fb: FormBuilder) { }

  registerUser(): void {
    const user = this.loginForm.value;
    this.usersService.register(user).subscribe((res) => {
      if (res.error) {
        this.errorMessage = res.error.errorMessage;
      } else {
        this.authSuccess(res);
      }
    });
  }

  loginUser(): void {
    const user = this.loginForm.value;
    this.usersService.login(user).subscribe((res) => {
      if (res.error) {
        this.errorMessage = res.error.errorMessage;
      } else {
        this.authSuccess(res);
      }
    });
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
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
}
