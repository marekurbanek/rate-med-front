import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {
  isLoggedIn: boolean;
  constructor(private usersService: UsersService) { }

  logout(): void {
    this.usersService.logout();
    this.isLoggedIn = this.usersService.isLoggedIn();
  }

  ngOnInit() {
    this.isLoggedIn = this.usersService.isLoggedIn();
  }
}
