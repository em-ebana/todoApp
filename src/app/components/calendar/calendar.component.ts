import {
  Component,
  Input,
  Output,
  OnInit,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import {
  MatCalendar,
  MatCalendarCellClassFunction,
  MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { Todos } from 'src/app/models/todos.model';
import { TodoRepository } from '../../models/todos.repository';
import { DataSource } from '@angular/cdk/collections';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
 DataSource: Todos[] = []
  @Input() 
  todo: Todos | undefined;
  @Output() onCloseClicked: EventEmitter<any> = new EventEmitter();
  @Output() ondelClicked: EventEmitter<number> = new EventEmitter();
  @Output() onEditClicked: EventEmitter<Todos> = new EventEmitter();


  status: string[] = ['In Progress', 'Started', 'Delayed', 'Completed'];

  constructor(public dialog: MatDialog, private repository: TodoRepository) {
    // this.datas = this.repository.eventDates();
  }

  openDialog() {
    let dialogRef = this.dialog.open(DialogFormComponent, {
      position: {
        top: '2em',
        bottom: '2em',
      },
      width: '50%',
      height: '90%',
    });
  }

  close(e: Event): void {
    this.onCloseClicked.emit(undefined)    
    // TODO
  }
  closeDetails(todoId: number | undefined, e: Event){   
    if(todoId){
    this.repository.deleteTodo(todoId, e)    
     this.close(e)
    }
    
  }

  editDetails(todo : Todos, e: Event){
    this.onEditClicked.emit(todo)
    let dialogRef = this.dialog.open(DialogFormComponent, {
      data: todo,
      position:{
        top: "2em",
        bottom: "2em"
      },
      width: "50%",
      height: "90%"
    
    });
    this.close(e)
  }
}
