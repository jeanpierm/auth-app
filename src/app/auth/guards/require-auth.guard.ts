import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginComponent } from '../pages/login/login.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RequireAuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.validateAndRefreshToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.authService.logout();
          this.router.navigateByUrl(LoginComponent.PATH);
        }
      })
    );
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.authService.validateAndRefreshToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.authService.logout();
          this.router.navigateByUrl(LoginComponent.PATH);
        }
      })
    );
  }
}
