import { Component, Input,Inject, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Todos } from 'src/app/models/todos.model';
import { TodoRepository } from 'src/app/models/todos.repository';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { image } from 'src/app/models/static.datasource';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TitleStrategy } from '@angular/router';


/**
 @title Datepicker action buttons
 */

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})




export class DialogFormComponent implements OnInit {
  private todoInput!: Todos;
  todoImages: image[] = [];
  strImg: string ='';
  
public savetodoForm = new FormGroup({
  id: new FormControl(),
  title: new FormControl(""),
  startDate: new FormControl(""),
  endDate: new FormControl(""),
  img: new FormControl("") ,
  img_description: new FormControl(""),
  note: new FormControl(""),
  todo_status: new FormControl(""),
  todo_category: new FormControl(""),
  firebaseId: new FormControl("")

});



  constructor(private repository: TodoRepository, 
               private location: Location,
               private dialogRef: MatDialogRef<DialogFormComponent>,
               @Inject(MAT_DIALOG_DATA) public data: Todos
   ) { 
    if(this.data){
     
      this.savetodoForm.setValue({
        id: this.data.id,
        title: this.data.title ?? "",
        startDate: this.data.startDate ?? "",
        endDate: this.data.endDate ?? "",
        img: this.data.img ?? "",
        img_description: this.data.img_description ?? "",
        note: this.data.note ?? "",
        todo_status: this.data.todo_status ?? "",
        todo_category: this.data.todo_category ?? "",
        firebaseId: this.data.firebaseId ?? ""
      })
    }
   }

igGeneartor(){
  let key = '0123456789875653425364758393734859504316121902345234563'
  let id = ''
  while(id.length < 8){
  let index =  Math.floor(Math.random() * 32)
  id += key.charAt(index)
  }
return id
}

onCancel(){
  this.dialogRef.close();
}



 saveTodo(){
  if(this.data){
    // console.log("update todo",this.savetodoForm.value)
    this.repository.updateTodo(this.savetodoForm.value as Todos)

  }else{
    if(this.savetodoForm.valid){   
      let id = +(this.igGeneartor());
      this.savetodoForm.patchValue({id: id});
      this.savetodoForm.patchValue({todo_status: "In review"});
      this.repository.saveTodo(this.savetodoForm.value as Todos)
      //  console.log(str)
      
    }
  }

  
 }

  ngOnInit(): void {
  this.repository.getAllImages().subscribe(data => {
    this.todoImages = data;
  
  })

  }

}
