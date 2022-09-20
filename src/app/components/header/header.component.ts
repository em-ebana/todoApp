import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserAuthServiceService } from 'src/app/auth/user-auth-service.service';
import { UserAuthenticateService } from 'src/app/auth/user-authenticate.service';
import { TodoRepository } from 'src/app/models/todos.repository';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
currentUser: string = '';
isLoggedIn: boolean = false;
  constructor(private dialog: MatDialog, 
    private repository: TodoRepository,
    private us: UserAuthenticateService,
    private userAuth: UserAuthServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.us.userChanged.subscribe(res =>{
      this.currentUser = res;
      this.isLoggedIn = !this.isLoggedIn;
      })
   }

 

  openDialog(){
    let dialogRef = this.dialog.open(DialogFormComponent, {
      position:{
        top: "2em",
        bottom: "2em"
      },
      width: "50%",
      height: "90%"
    
     }); 

  }

  getAllTodos(){
    this.repository.todoChanged.emit(true)
  }

  

  public logout(){
    this.userAuth.clear();
    this.isLoggedIn = !this.isLoggedIn;
    this.router.navigateByUrl("/login")

  }

}
