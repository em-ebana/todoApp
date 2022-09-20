import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoOverviewComponent } from './components/todo-overview/todo-overview.component';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserTodoGuardService } from './auth/user-todo-guard.service';

const routes: Routes = [
  {path:"", redirectTo: "signup", pathMatch: "full"},
  {path: "signup", component: SignupComponent},
  {path: "home", component: HomeComponent, canActivate:[UserTodoGuardService]},
  {path: "button", component: TodoOverviewComponent, canActivate:[UserTodoGuardService]},
  {path: "dialogForm", component: DialogFormComponent, canActivate:[UserTodoGuardService]},
  {path: "header", component: HeaderComponent, canActivate:[UserTodoGuardService]},
  {path: "login", component: LoginComponent},
  {path: "calendar", component: CalendarComponent, canActivate:[UserTodoGuardService]},
 
];
// canActivate:[UserTodoGuardService]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
