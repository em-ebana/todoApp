import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoRepository } from 'src/app/models/todos.repository';
import { Todos } from 'src/app/models/todos.model';
import { NgForm, FormGroup, FormControl } from '@angular/forms';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: '[app-category]',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  status: string[] = []
  errmsg = false

  categories: string[] = []

  @Output() searchBtnClicked = new EventEmitter<FormGroup>()

  constructor(private repository: TodoRepository ) { }

  ngOnInit(): void {
    this.repository.getCategories().subscribe((res:any) =>{
      this.categories = res      
    })
    this.repository.getTodoStatus().subscribe((res:any) =>{
      this.status = res      
    })
  }
  
  searchForm = new FormGroup({
    categories: new FormControl(),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    status: new FormControl()
  })

  searchFormSubmitted(e: any){
    e.stopPropagation();
    e.preventDefault();
    let Start = this.searchForm.controls['startDate'].getRawValue();
    let End = this.searchForm.controls['endDate'].getRawValue();
    let Status = this.searchForm.controls['status'].getRawValue();
    let Categories = this.searchForm.controls['categories'].getRawValue();
  
  if(!Start && !End && !Status && !Categories){
     this.errmsg = true
     return;
  }
  this.errmsg = false

if(Start){
  let dateSelectStart = new Date(Start);
 let dateString = new Date(dateSelectStart.getTime() - (dateSelectStart.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
    this.searchForm.patchValue({startDate: dateString})
}
if(End){
  let dateSelectEnd = new Date(End);
  let dateStringEnd = new Date(dateSelectEnd.getTime() - (dateSelectEnd.getTimezoneOffset() * 60000 ))
                      .toISOString()
                      .split("T")[0];
  this.searchForm.patchValue({endDate: dateStringEnd})
} 
 
  
 this.searchBtnClicked.emit(this.searchForm)
  
  }

}
