import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PlanningService} from '../planning.service';
import {CalendarEvent,  CalendarView} from 'angular-calendar';
import {startOfDay, endOfDay, startOfHour, endOfHour, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import {Unavailability} from '../shared/unavailability.model';

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

  constructor(private planningService: PlanningService) { }

  viewDate: Date = new Date();
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.Week;
  events: CalendarEvent[] = [
  ];

  setView(view: CalendarView) {
    this.view = view;
  }

  getEvents(): void {
    this.planningService.getEvents()
      .subscribe((data : CalendarEvent[]) => {
        this.events = data;
      });

  }

  setUp(name : string, start : string, end : string): void {
    this.events = [
      ...this.events,
      {
        title: name,
        start: new Date(start),
        end: new Date(end),
        color: colors.red
      }
    ]
    var eventToAdd : Unavailability = {
      nameIndispo: name,
      start: start,
      end: end,
      professor : { professorId : 1},
      classroom : { classroomId : 1 },
      equipment : { equipmentId : 1 },
      studentClass : { studentClassId : 1 }
    }
    this.planningService.addEvent(eventToAdd).subscribe();
  }

  ngOnInit(): void {
    this.getEvents();
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfHour(new Date()),
        end: endOfHour(new Date())
      }
    ];
  }
}
