import { Component, OnInit } from '@angular/core';
import {Unavailability} from '../shared/unavailability.model';
import {Person} from '../shared/person.model';
import {Observable} from 'rxjs';
import {PersonService} from '../person.service';
import {ActivatedRoute} from '@angular/router';
import {CalendarEvent} from 'angular-calendar';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  students: Person[];
  student: Person;
  professors: Person[];
  professor: Person[];
  directors: Person[];
  directo: Person;

  constructor(private personService: PersonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPersons();
    }

  getPersons(): void {
    this.getStudents();
    this.getProfessors();
  }


  getStudents(): void {
  this.personService.getAllStudents()
      .subscribe(persons => this.students = persons);
  }

  getStudentById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getStudentById(id)
        .subscribe((student => this.student = student));
  }

  getProfessors(): void {
    this.personService.getAllProfessors()
        .subscribe(persons => this.professors = persons);
  }

}
