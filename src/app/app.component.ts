import { Component } from '@angular/core';
import { TodoItem } from './todoItems';
import { TodoList } from './todoList';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private list = new TodoList("Bob", [
    new TodoItem("Go for run", true),
    new TodoItem("Get flowers"),
    new TodoItem("Collect tickets"),
  ])

  get userName(): string{
    return this.list.user;
  }

  get itemCount():number{
    return this.list.items.filter(item => !item.complete).length;
  }
}
