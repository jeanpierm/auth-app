import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { UsersService } from 'src/app/admin/services/users.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isAuthRequired(req)) {
      // Get the auth token from the service.
      const authToken = this.authService.accessToken;

      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({ setHeaders: { Authorization: authToken } });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}

function isAuthRequired(req: HttpRequest<any>) {
  return req.url.includes(UsersService.baseUrl);
}
