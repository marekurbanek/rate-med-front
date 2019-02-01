import { Component, OnInit, OnChanges } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor (private usersService: UsersService) { }

  ngOnInit() {
    if (this.usersService.isLoggedIn()) {
      this.usersService.fetchUserData().subscribe(res => {
        if (res.error) {
          this.usersService.logout();
        } else {
          this.usersService.setUser(res);
        }
      });
    }
  }
}
