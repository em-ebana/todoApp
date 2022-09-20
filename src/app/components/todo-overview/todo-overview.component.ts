import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoRepository } from 'src/app/models/todos.repository';
import { Todos } from 'src/app/models/todos.model';
import { FormGroup } from '@angular/forms';
import {
  filter,
  concatMap,
  toArray,
  reduce,
  from,
  map,
  switchMap,
  Observable,  
} from 'rxjs';




@Component({
  selector: 'app-todo-overview',
  templateUrl: './todo-overview.component.html',
  styleUrls: ['./todo-overview.component.scss'],
})
export class TodoOverviewComponent implements OnInit {
  todoData: Todos[] = [];
 selectedSearch = []
 data2Filter: Todos[] = []

  private monthFilter: string | null = null;
  // @Input() delTodo!: number

  @Output()
  todoItemSelected = new EventEmitter<number>();

  @Input()
  set calSearch(inputData: number | null) {
    if (inputData) {
      // set month filter
      this.monthFilter = '';
      if (inputData < 10) {
        this.monthFilter += '0';
      }
      this.monthFilter += inputData;
    } else {
      // reset month filter
      this.monthFilter = null;
    }

    this.applyFilter();
  }

  @Input()
  set catSearch(inputData: any) {       
    this.filterSearch(inputData)     
 } 

  constructor(private repository: TodoRepository) {
  
  }
  

  ngOnInit(): void {
  this.fetchTodos() 
  this.repository.todoChanged.subscribe(() => 
  this.fetchTodos())
  } 

  fetchTodos(){
    this.repository.getAllTodos().subscribe((todos) => {
      let data = []
      for(const key in todos){
        if(todos.hasOwnProperty(key)){
          data.push({...todos[key], firebaseId: key})
        }
      }   
     this.todoData = data
    });
  }

  private applyFilter() {
    this.repository
      .getAllTodos()
      .pipe(
        concatMap((todo) => todo),
        filter((todo) => !this.monthFilter || todo.startDate?.substring(5, 7) === this.monthFilter),
        toArray()
      )
      .subscribe((todos) => (this.todoData = todos));
  }

 

  filterSearch(inputData: {[key: string]: string}){
    this.repository.getAllTodos().subscribe(
      ( datas) => this.data2Filter = datas)

    if(inputData){
      let searchItems: string[] =[] 
      let searchKeys = Object.keys(inputData)  
    
      searchKeys.forEach(k => {
        if( inputData[k]) { 
          searchItems.push(inputData[k])
        }
        })
        
      

        from(searchItems).pipe(
            reduce((total:Todos[] , item ) => total.filter(d => d.startDate === item  || d.endDate === item  || d.todo_status === item  || d.todo_category === item  ), this.data2Filter)
          ).subscribe(
            data => this.todoData = data  
          )     
    }   
  }


  readMoreClicked(todoId: number | undefined) {
    if(todoId)
      this.todoItemSelected.emit(todoId);
  }


 
}


