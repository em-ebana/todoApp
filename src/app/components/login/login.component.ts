import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthServiceService } from 'src/app/auth/user-auth-service.service';
import { UserAuthenticateService } from 'src/app/auth/user-authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errmsg: string = '';
  userLoggedIn: string = ''
loginForm = new FormGroup({
  email: new FormControl("",[Validators.required, Validators.email]),
  password: new FormControl("", [Validators.required, Validators.min(6)])
})
  constructor(private userAuth: UserAuthenticateService,
    private us: UserAuthServiceService,
    private router: Router) { }

  userLogin(){
    this.userAuth.logIn(this.loginForm).subscribe({
      next: (res) =>{     
        this.userLoggedIn = res.username;
        this.us.setToken(res.token)  
        this.userAuth.userChanged.emit(this.userLoggedIn)
        this.router.navigate(['home'])
      },
      error: err => {
        this.errmsg = err.message;
        console.log(this.errmsg);
      }

    })
  }

  ngOnInit(): void {
  }

}
