import { Injectable } from '@angular/core';

import {CalendarEvent, CalendarEventAction, CalendarView} from 'angular-calendar';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unavailability } from './shared/unavailability.model';
import {map, tap} from 'rxjs/operators';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  }};

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private planningUrl = 'http://localhost:8080/apiRoom/classroomsPlanning/1';
  private classroomPlanningUrl = 'http://localhost:8080/apiRoom/classroomsPlanning';
  private professorPlanningUrl = 'http://localhost:8080/apiProf/professorsplanning';
  private studentClassPlanningUrl = 'http://localhost:8080/apiProf/professorsplanning';
  private equipmentPlanningUrl = 'http://localhost:8080/apiEquipment/equipmentsplanning';

  private addUrl = 'http://localhost:8080/apiUnavailability/addunavailability';
  private deleteUrl = 'http://localhost:8080/apiUnavailability/deleteunavailability';
  private editUrl = 'http://localhost:8080/apiUnavailability/udpateunavailability';


  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getClassroomPlanning(id: number): Observable<CalendarEvent[]> {
    const url = `${this.classroomPlanningUrl}/${id}`;
    return this.http.get<Unavailability[]>(url)
        .pipe(map((response: Unavailability[]) => {
          let events: CalendarEvent[] = [];
          response.forEach((unavailability: Unavailability, index) => {
            events = [
              ...events,
              {
                id: unavailability.id,
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
  getProfessorPlanning(id: number): Observable<CalendarEvent[]> {
    const url = `${this.professorPlanningUrl}/${id}`;
    return this.http.get<Unavailability[]>(url)
        .pipe(map((response: Unavailability[]) => {
          let events: CalendarEvent[] = [];
          response.forEach((unavailability: Unavailability, index) => {
            events = [
              ...events,
              {
                id: unavailability.id,
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

  getStudentClassPlanning(id: number): Observable<CalendarEvent[]> {
    const url = `${this.studentClassPlanningUrl}/${id}`;
    return this.http.get<Unavailability[]>(url)
        .pipe(map((response: Unavailability[]) => {
          let events: CalendarEvent[] = [];
          response.forEach((unavailability: Unavailability, index) => {
            events = [
              ...events,
              {
                id: unavailability.id,
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
  getEquipmentPlanning(id: number): Observable<CalendarEvent[]> {
    const url = `${this.equipmentPlanningUrl}/${id}`;
    return this.http.get<Unavailability[]>(url)
        .pipe(map((response: Unavailability[]) => {
          let events: CalendarEvent[] = [];
          response.forEach((unavailability: Unavailability, index) => {
            events = [
              ...events,
              {
                id: unavailability.id,
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

  addEvent(event: Unavailability): Observable<Unavailability> {
    return this.http.post<Unavailability>(this.addUrl, event, this.httpOptions);
  }

  deleteEvent(event: Unavailability): Observable<Unavailability> {
    const id = typeof event === 'number' ? event : event.id;
    const url = `${this.deleteUrl}/${id}`;
    return this.http.get<Unavailability>(url, this.httpOptions);
  }

  editEvent(event: Unavailability): Observable<Unavailability> {
    const id = typeof event === 'number' ? event : event.id;
    const url = `${this.editUrl}/${id}`;
    return this.http.post<Unavailability>(url, event, this.httpOptions);
  }
}
