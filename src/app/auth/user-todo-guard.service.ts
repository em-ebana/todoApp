import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { UserAuthServiceService } from './user-auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class UserTodoGuardService implements CanActivate  {

  constructor(private router: Router,     
     private authService: UserAuthServiceService) { }

  canActivate(): boolean {
    if(this.authService.getToken().length < 1){  
      this.router.navigate(['login']);      
      return false;
    }      
      return true;   
    
  }
}


  
  


