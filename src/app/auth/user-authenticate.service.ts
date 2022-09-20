import { HttpClient,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { User, authData } from '../models/user.model'

interface SigninData{
token:	string,	
username:	string	
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticateService {
userChanged: EventEmitter<string> = new EventEmitter()
BASE_URL :string = 'http://localhost:3000/users';
requestHeader = new HttpHeaders({"No-Auth": "True"})

  constructor(private http: HttpClient) { }

    //USERSSIGNUP
    addUser(data: FormGroup){
      let dataReceived = data.value;      
      let API_URL = `${this.BASE_URL}/signup`;
      return this.http.post(API_URL, dataReceived,{headers: this.requestHeader})
      .pipe(
        catchError(this.handleError)
  
       )
    }
  
    //USERS signin
    logIn(data: FormGroup){
      let loginData = data.value;
      let API_URL = `${this.BASE_URL}/signin`;
      return this.http.post<SigninData>(API_URL, loginData)
      .pipe(
       catchError(this.handleError)
  
      )
  
    }
  
    // ERROR
    handleError(error: HttpErrorResponse): Observable<never>{
      return throwError(() => error.error || "server error, try again.");
     }
}
