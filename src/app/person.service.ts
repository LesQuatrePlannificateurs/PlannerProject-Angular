import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Person} from './shared/person.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private allstudentsUrl = 'http://localhost:8080/apistudent/allstudents';
  private studentByIdUrl = 'http://localhost:8080/apistudent/findstudent';
  private allprofessorsUrl = 'http://localhost:8080/apiprof/findallprofessors';

  constructor(
      private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getAllStudents(): Observable<Person[]> {
  return this.http.get<Person[]>(this.allstudentsUrl); // impossible d'avoir tout le monde dans la meme requete
  }

  getStudentById(id: number): Observable<Person> {
    const url = `${this.studentByIdUrl}/${id}`;
    return this.http.get<Person>(url);
  }

  getAllProfessors(): Observable<Person[]> {
    return this.http.get<Person[]>(this.allprofessorsUrl);
  }
 }
