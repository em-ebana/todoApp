import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {

  constructor(private router: Router) { }
  
  setToken(token: string){
    localStorage.setItem('token', token);
  }
  getToken(): string{
    return localStorage.getItem('token') ?? '';
  }

  isLoggedIn(){
    return this.getToken();
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['home']);
  }

  clear(){
    localStorage.clear();
  }
}





  


 


 

 

 




 




