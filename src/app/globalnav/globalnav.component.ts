import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {PersonComponent} from '../person/person.component';
import { AuthenticationService } from '../service/authentification.service';


@Component({
  selector: 'app-globalnav',
  templateUrl: './globalnav.component.html',
  styleUrls: ['./globalnav.component.css']
})
export class GlobalnavComponent implements OnInit {

  constructor(private location: Location, public loginService: AuthenticationService) { }


  ngOnInit(): void {
  }
  goBack(): void {
    this.location.back();
  }



}
