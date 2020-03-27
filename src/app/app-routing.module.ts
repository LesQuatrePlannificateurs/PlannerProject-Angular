import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent} from './homepage/homepage.component';
import {PlanningComponent} from './planning/planning.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'classroomsplanning/:id', component: PlanningComponent },
  { path: 'professorsplanning/:id', component: PlanningComponent },
  { path: 'studentclassplanning/:id', component: PlanningComponent },
  { path: 'equipmentsplanning/:id', component: PlanningComponent },
  { path: 'allplannings', component: PlanningComponent }
];

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
