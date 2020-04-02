import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Professor} from './shared/professor.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Student} from './shared/student.model';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private allstudentsUrl = 'http://localhost:8080/apistudent/allstudents';
  private studentByIdUrl = 'http://localhost:8080/apistudent/findstudent';
  private allprofessorsUrl = 'http://localhost:8080/apiprof/findallprofessors';
  private deleteProfessorByIdUrl = 'http://localhost:8080/apiprof/deleteprofessor';
  private deleteStudentByIdUrl = 'http://localhost:8080/apistudent/deletestudent';

  constructor(
    private http: HttpClient,
  ) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.allstudentsUrl); // impossible d'avoir tout le monde dans la meme requete
  }

  getStudentById(id: number): Observable<Student> {
    const url = `${this.studentByIdUrl}/${id}`;
    return this.http.get<Student>(url);
  }

  getAllProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.allprofessorsUrl);
  }


  deleteProfessor(professor: Professor | number): Observable<Professor> {
    const id = typeof professor === 'number' ? professor : professor.professorId;
    const url = `${this.deleteProfessorByIdUrl}/${id}`;
    return this.http.get<Professor>(url, this.httpOptions);
  }

  deleteStudent(student: Student | number): Observable<Student> {
    const id = typeof student === 'number' ? student : student.studentId;
    const url = `${this.deleteStudentByIdUrl}/${id}`;
    return this.http.get<Student>(url, this.httpOptions);
  }



}
