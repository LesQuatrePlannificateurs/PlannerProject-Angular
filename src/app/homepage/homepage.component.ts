import { Component, OnInit } from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentification.service';


@Component({
  selector: 'app-homepage',
  host: {
    class: 'homepageBody'
  },
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  username: '';
  password: '';
  invalidLogin = false;

  constructor(private route: Router, private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

//     checkLogin() {
//     if (this.loginservice.authenticate(this.username, this.password)
//     ) {
//       this.route.navigate(['allplannings']);
//       this.invalidLogin = false;
//     } else
//       this.invalidLogin = true;
//     }

 checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.route.navigate(['allplannings'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true

      }
    )
    );

  }
}


