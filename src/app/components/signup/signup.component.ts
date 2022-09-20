import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserAuthenticateService } from 'src/app/auth/user-authenticate.service';
import { passwordMatch } from './passwordMatcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // showPassword: boolean = false;
  ch: boolean = false;
  errmsg : string = ''

  constructor(private userAuth: UserAuthenticateService,
    private router: Router) {  }

  signupForm = new FormGroup({
    name: new FormControl(""),
    username: new FormControl(""),
    email: new FormControl("", [Validators.email, Validators.required ]),
    password1: new FormControl("", [Validators.required, Validators.minLength(6) ]),
    password2: new FormControl("", [Validators.required, Validators.minLength(6), passwordMatch ]),
    isAgreed: new FormControl()
  })

  ngOnInit(): void {
  }

  registerUser(){
  const formValues = this.signupForm.value; 

  const nonNullChecker = (checklist :object) =>
  Object.values(checklist).every(
    (value) => value !== "");  


  if(nonNullChecker(formValues)){    
    this.userAuth.addUser(this.signupForm ).subscribe({
      next: (res) =>{        
        this.router.navigate(['login'])},
      error: err => {
        this.errmsg = err.message;
        console.log(this.errmsg);
      }

    })
  }
 
}
}
