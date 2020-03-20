import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PlanningService} from '../planning.service';
import {CalendarEvent,  CalendarView} from 'angular-calendar';
import {startOfDay, endOfDay, startOfHour, endOfHour, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';

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

  ngOnInit(): void {
    this.getEvents();
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfHour(new Date()),
        end: endOfHour(new Date()),
      }
    ];
  }
}
