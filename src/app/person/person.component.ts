import { Component, OnInit } from '@angular/core';
import {Unavailability} from '../shared/unavailability.model';
import {Professor} from '../shared/professor.model';
import {Observable} from 'rxjs';
import {PersonService} from '../person.service';
import {ActivatedRoute} from '@angular/router';
import {CalendarEvent} from 'angular-calendar';
import {Student} from '../shared/student.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  students: Student[];
  student: Student;
  professors: Professor[];
  professor: Professor;
  directors: Professor[];
  directo: Professor;

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

  deleteProfessor(professor: Professor): void {
    this.professors = this.professors.filter(p => p !== professor);
    // const professorToDeleteFromBD: Professor = {
    //   professorId: Number(professor.professorId),
    //   firstname: professor.firstname,
    //   lastname: professor.lastname,
    //   login: professor.login,
    //   password: professor.password
    // }
    this.personService.deleteProfessor(professor).subscribe(() => this.getProfessors());
  }

  deleteStudent(student: Student): void {
    this.students = this.students.filter(s => s !== student);
    this.personService.deleteStudent(student).subscribe(()  => this.getStudents());
  }

}
