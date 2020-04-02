import { Injectable } from '@angular/core';

import {CalendarEvent, CalendarEventAction, CalendarView} from 'angular-calendar';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unavailability } from './shared/unavailability.model';
import {map, tap} from 'rxjs/operators';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  }};

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private planningsUrl = 'http://localhost:8080/apiunavailability/allplannings';
  private classroomPlanningUrl = 'http://localhost:8080/apiroom/classroomsplanning';
  private professorPlanningUrl = 'http://localhost:8080/apiprof/professorsplanning';
  private studentClassPlanningUrl = 'http://localhost:8080/apistudentclass/studentclassplanning';
  private equipmentPlanningUrl = 'http://localhost:8080/apiequipment/equipmentsplanning';

  private addUrl = 'http://localhost:8080/apiUnavailability/addunavailability';
  private deleteUrl = 'http://localhost:8080/apiUnavailability/deleteunavailability';
  private editUrl = 'http://localhost:8080/apiUnavailability/udpateunavailability';


  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getEvents(route: ActivatedRouteSnapshot, id: number): Observable<CalendarEvent[]> {
    const classroomUrlplanning = `${this.classroomPlanningUrl}/${id}`;
    const professorsUrlPlanning = `${this.professorPlanningUrl}/${id}`;
    const studentClassUrlPlanning = `${this.studentClassPlanningUrl}/${id}`;
    const equipmentUrlPlanning = `${this.equipmentPlanningUrl}/${id}`;
    if (classroomUrlplanning.includes(`${route.url[0].toString()}/${id}`)) {
      return this.getClassroomPlanning(id);
    } else if (professorsUrlPlanning.includes(`${route.url[0].toString()}/${id}`)) {
      console.log(`${route.url[0].toString()}/${id}`);
      return this.getProfessorPlanning(id);
    } else if (studentClassUrlPlanning.includes(`${route.url[0].toString()}/${id}`)) {
      return this.getStudentClassPlanning(id);
    } else if (equipmentUrlPlanning.includes(`${route.url[0].toString()}/${id}`)) {
      return this.getEquipmentPlanning(id);
    } else if (this.planningsUrl.includes(route.url[0].toString())){
      return this.getAllPlannings();
    }
  }

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

  getAllPlannings(): Observable<CalendarEvent[]> {
    const url = this.planningsUrl;
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
