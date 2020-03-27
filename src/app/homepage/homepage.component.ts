import { Component, OnInit } from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-homepage',
  host: {
    class: 'homepageBody'
  },
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  // findPersonByLogin(): void {
  //   const login = +this.route.snapshot.paramMap.get('login');
  //   this.personService.searchPerson(login);
  // }

}
