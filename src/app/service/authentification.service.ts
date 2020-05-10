import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Professor } from '../shared/professor.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient : HttpClient) { }

    // si la requete get retourne bien un objet de type professeur, alors ca execute
    // le pipe et ca met l'userName dans le sesson storage, qui va passer le isUserLoggedIn à true dans le homepage html
    // elle retournera bien un objet de type Professor si le username et password contenus dans le header sont les username
    // et password indiqué dans la partie security dans spring

      authenticate(username, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.get<Professor>('http://localhost:8080/apiprof/validateProfLogin', {headers}).pipe(
     map(
       validLogin => {
        sessionStorage.setItem('username',username);
        sessionStorage.setItem('password',password);
       }
     )

    );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
}
