
import { Injectable } from '@angular/core';
import { RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.map( user => {
      if (user) {
        return true;
      }

      console.log('User is not logged in. ReturnUrl is: \'' + state.url + '\'');
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
      return false;

    });
  }

}
