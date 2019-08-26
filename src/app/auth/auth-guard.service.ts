import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'app/main/auth/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(rout: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.authenticated()
      .pipe( tap(b => {
        if(!b)
          this.router.navigateByUrl('auth/login');
      }))
  }
}
