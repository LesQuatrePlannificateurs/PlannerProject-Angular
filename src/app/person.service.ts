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
    let username = sessionStorage.getItem('username');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<Student[]>(this.allstudentsUrl, {headers}); // impossible d'avoir tout le monde dans la meme requete
  }

  getStudentById(id: number): Observable<Student> {
    let username = sessionStorage.getItem('username');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    const url = `${this.studentByIdUrl}/${id}`;
    return this.http.get<Student>(url, {headers});
  }

  getAllProfessors(): Observable<Professor[]> {
    let username = sessionStorage.getItem('username');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get<Professor[]>(this.allprofessorsUrl, {headers});
  }


  deleteProfessor(professor: Professor | number): Observable<Professor> {
    let username = sessionStorage.getItem('username');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    const id = typeof professor === 'number' ? professor : professor.professorId;
    const url = `${this.deleteProfessorByIdUrl}/${id}`;
    return this.http.get<Professor>(url, {headers});
  }

  deleteStudent(student: Student | number): Observable<Student> {
    let username = sessionStorage.getItem('username');
    let password=sessionStorage.getItem('password');
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    
    const id = typeof student === 'number' ? student : student.studentId;
    const url = `${this.deleteStudentByIdUrl}/${id}`;
    return this.http.get<Student>(url, {headers});
  }



}
