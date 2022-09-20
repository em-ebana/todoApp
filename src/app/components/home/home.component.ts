import { KeyValue } from '@angular/common';
import { Component, OnDestroy, OnInit, Output, Input, EventEmitter, HostListener } from '@angular/core';
import { map, Observable, toArray } from 'rxjs';
import { TodoRepository } from '../../models/todos.repository';
import { Todos } from '../../models/todos.model';
import { FormGroup } from '@angular/forms';
import { Todo } from '../../models/todo.model';
import { ThisReceiver } from '@angular/compiler';

interface Calendar {
  [key: string | number]: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{
  scrolY = window.scrollY;
  calendarSearch: number | null = null;
  categorySearch!: FormGroup;
  todo: Todos | undefined;
  hidetoggle = false
  cl!: string 
  @Input() DelTodo!:number

  calendarOrder = (
    a: KeyValue<string, string>,
    b: KeyValue<string, string>
  ): number => {
    return +a.value > +b.value ? 1 : +a.value < +b.value ? -1 : 0;
  };

  CalendarData: Calendar = {
    1: 'January',
    2: 'Feburary',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  

  constructor(private repository: TodoRepository) {}

  ngOnInit(): void {}

  fetchMonthTodo(data: any) {
    let calendarId = data.target.value;
    this.calendarSearch = calendarId;
  }

  showTodoDetails(todoId: number) {
    const el = document.getElementById('content-media-query');
    if(el !== null){
      el.classList.add("content-responsive")
    }
    this.repository.getTodoById(todoId)?.subscribe((data) => {   
      this.todo = data          
    });   
    
    this.hidetoggle = true    
  }

  sendSearchData(searchFormdata: FormGroup){
    this.categorySearch = searchFormdata.value

  }

  hidenav(e: Event){   
    const el = document.getElementById('content-wrapper');
    if(el !== null){
      if(this.scrolY < window.scrollY) { 
        el.classList.add("nav--hidden")
      }else{ 
          el.classList.remove("nav--hidden");
        }
      this.scrolY = window.scrollY
    }
  }

 

  close(e:any){
    const el = document.getElementById('content-media-query');
    if(this.todo){
      this.todo.id = undefined;
      if(el !== null){
        el.classList.remove("content-responsive")
      }
       this.hidetoggle = false
    } 
  }

}
