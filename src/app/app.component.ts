import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    // Some of This code below is a fix for some code in auth.service
    // because the signInWithRedirect method's return promise is never reached
    // thus we must subscribe to the auth service here and check for a registered user
    // THIS WILL NOT BE NEEDED IF WE SWITCH TO signInWithPopUp suposedly
    auth.user$.subscribe( user => {
      if (!user) { return; }

      userService.save(user); // Probably don't want to save on every login in the future, and only when user chooses to update

      const returnUrl = localStorage.getItem('returnUrl');
      // ensure that returnUrl gets destroyed after initialization so that future page refreshes go to correct page
      if (!returnUrl) { return; }

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);


    });
  }
}
