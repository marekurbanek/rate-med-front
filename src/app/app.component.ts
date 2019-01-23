import { Component, OnInit, OnChanges } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  constructor(private usersService: UsersService) { }

  
  ngOnInit() {

  }
}
