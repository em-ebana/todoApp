import { DataSource } from '@angular/cdk/collections';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { StaticDataSource } from './static.datasource';
import { Todos } from './todos.model';
import { BehaviorSubject, from, map, Observable, switchMap, flatMap, catchError, throwError, toArray } from 'rxjs';
import { Todo } from './todo.model';
import { image } from './static.datasource';
import { HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoRepository {
  private todos: Todos[] = [];
  private categories: string[] = [];
  private status: string[] = [];
  todoChanged: EventEmitter<boolean> = new EventEmitter()

  private baseUrl: string = 'http://localhost:3000/todos';

  refreshList$ = new BehaviorSubject<boolean>(true);
  UIchange = new BehaviorSubject<any>(10);
  uiChange$: Observable<any> = this.UIchange.asObservable();

  constructor(private dataSource: StaticDataSource, private http: HttpClient) {}

  getCategories():any{
    return this.http.get(`${this.baseUrl}/todoCategories`)

  }

  getTodoStatus(){
     return this.http.get<{[key: string]: string[]}>(`${this.baseUrl}/todoStatus`)     
  }

  getAllTodos(): Observable<Todos[]> {
     return this.http.get<Todos[]>(this.baseUrl).pipe(
      map((responseData) => {
        this.status = [...new Set( responseData.map(t => t.todo_status))] as string[];
        this.categories = [...new Set(responseData.map(todo => todo.todo_category))] as string[]        
        return responseData
      })
     )
    
  }

  getAllImages(): Observable<image[]> {
    return this.dataSource.getImages();
  }

  deleteTodo(todoid: number, e: Event) {    
   this.http.delete(`${this.baseUrl}/delTodo/${todoid}`).subscribe(() =>
   this.todoChanged.emit(true)
   )   
  }

  getTodoById(id: number) {    
    return this.http.get(`${this.baseUrl}/${id}`).pipe(
      map(res => { 
    console.log(res)
    return res }
      )        
    )
  }
 

  saveTodo(obj: Todos): void { 
    // let body = {'body': obj};   
    this.http.post(this.baseUrl, obj).subscribe(      
     ()=> this.todoChanged.emit(true)
    )    
  }

  updateTodo(obj: Todos): void {
    let updateId = obj.id
    let updatePath:string = `${this.baseUrl}/updateTodo/${updateId}`
    this.http.put(updatePath, obj).subscribe(
      ()=> this.todoChanged.emit(true)
    )       
  }

  handleError(error: Error): Observable<Todos[]>{
    return throwError(() => error || "server error, try again.");
   }


  todoSize(): number {
    return this.todos.length + 1;
  }
}
