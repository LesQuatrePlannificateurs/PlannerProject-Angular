import { Injectable } from '@angular/core';

import {CalendarEvent,  CalendarView} from 'angular-calendar';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unavailability } from './shared/unavailability.model';
import {map} from 'rxjs/operators';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  }};

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private planningUrl = 'http://localhost:8080/api/classroomsPlanning/1';

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getEvents(): Observable<CalendarEvent[]> {
      return this.http.get<Unavailability[]>(this.planningUrl)
      .pipe(map((response:Unavailability[]) => {
        let events: CalendarEvent[] = [];
        console.log(response);
        response.forEach((unavailability : Unavailability, index) => {
          events = [
            ...events,
            {
              title: unavailability.nameIndispo,
              start: new Date(unavailability.start),
              end: new Date(unavailability.end),
              color: colors.red
            }
          ];
        });
        return events;
      }));
  }
}
