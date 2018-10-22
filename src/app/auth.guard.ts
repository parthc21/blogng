import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from './user';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      if (localStorage.getItem('jwtToken')) {
        console.log(localStorage.getItem('jwtToken'));
        // logged in so return true
      return true;  
  }
  this.router.navigateByUrl('/login');
  return false;
  }
}
