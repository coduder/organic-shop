import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { AppUser } from '../models/app-user';
import { UserService } from './user.service';


@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl =
      this.route.snapshot.queryParamMap.get('returnUrl') || // sets return url if attempt to access url outside permisssions
      '/';                                                  // sets return url to home for all normal login scenarios
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    // The promise that is supposed to be returned from ^^^ does not work
    // implement a separate solution in app.component.ts
    // signInWithPopUp APPARENTLY DOES RETURN A PROMISE.
    // IF LATER CHANGE, DON"T FORGET TO DELETE CODE AT app.component
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    // This is a nested observable THEREFORE we cannot use | async pipe in the navbar template (INFINTE LOOP)
    // so need to subscribe to the auth.appUser$ observable once in the bs-navbar.component, and then pass that value
    // to the template
    return this.user$
    .switchMap( user => {
     if (user) {
      return this.userService.get(user.uid);
     }
     return Observable.of(null);
    });
  }
}
