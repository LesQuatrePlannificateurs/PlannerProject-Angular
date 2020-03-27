import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PlanningService} from '../planning.service';
import {CalendarEvent, CalendarEventAction, CalendarView} from 'angular-calendar';
import {startOfDay, endOfDay, startOfHour, endOfHour, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {Unavailability} from '../shared/unavailability.model';
import { ActivatedRoute } from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  }};

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  constructor(private planningService: PlanningService,  private route: ActivatedRoute) { }

  viewDate: Date = new Date();
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Week;
  events: CalendarEvent[] = [
  ];

  ngOnInit(): void {
    this.getEvents();
  }
  
  setView(view: CalendarView) {
    this.view = view;
  }

  getEvents(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.planningService.getEvents(this.route.snapshot, id)
        .subscribe((data: CalendarEvent[]) => {
          this.events = data;
        });
  }
  getClassroomEventsById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.planningService.getClassroomPlanning(id)
        .subscribe((data: CalendarEvent[]) => {
          this.events = data;
        });
  }
  getProfessorEventsById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.planningService.getProfessorPlanning(id)
        .subscribe((data: CalendarEvent[]) => {
          this.events = data;
        });
  }
  getStudentClassEventsById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.planningService.getStudentClassPlanning(id)
        .subscribe((data: CalendarEvent[]) => {
          this.events = data;
        });
  }
  getEquipmentClassEventsById(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.planningService.getEquipmentPlanning(id)
        .subscribe((data: CalendarEvent[]) => {
          this.events = data;
        });
  }
  addEvent(name: string, start: string, end: string): void {
    var eventToAdd : Unavailability = {
      id: null,
      nameIndispo: name,
      start : start,
      end : end,
      professor : { professorId : 1},
      classroom : { classroomId : 1 },
      equipment : { equipmentId : 1 },
      studentClass : { studentClassId : 1 }
    }
    this.planningService.addEvent(eventToAdd).subscribe(() => this.getEvents());
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter(event => event !== eventToDelete);
    var eventToDeleteFromDB : Unavailability = {
      id: Number(eventToDelete.id),
      nameIndispo: eventToDelete.title,
      start: eventToDelete.start.toDateString(),
      end: eventToDelete.end.toDateString(),
      professor : { professorId : 1},
      classroom : { classroomId : 1 },
      equipment : { equipmentId : 1 },
      studentClass : { studentClassId : 1 }
    }
    this.planningService.deleteEvent(eventToDeleteFromDB).subscribe(() => this.getEvents());
  }

  editEvent(id: number, name : string, start : string, end : string): void {
    var eventToEdit : Unavailability = {
      id:id,
      nameIndispo: name,
      start: start,
      end: end,
      professor : { professorId : 1},
      classroom : { classroomId : 1 },
      equipment : { equipmentId : 1 },
      studentClass : { studentClassId : 1 }
    }
    this.planningService.editEvent(eventToEdit).subscribe(() => this.getEvents());
  }
}
