import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { RegisterUser } from '../interfaces/register-user.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly AUTHORIZATION: string = 'Authorization';
  readonly LOGIN_ENDPOINT: string = 'api/login';
  readonly REFRESH_ENDPOINT: string = 'api/refresh-token';
  readonly REGISTER_ENDPOINT: string = 'api/register';
  readonly ACCESS_TOKEN_KEY: string = 'accessToken';
  readonly REFRESH_TOKEN_KEY: string = 'refreshToken';
  readonly BEARER: string = 'Bearer ';
  readonly SUCCESS_LOGIN_MESSAGE: string = 'Successfull login.';

  private user!: User;

  get authUser() {
    return { ...this.user };
  }

  get accessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY) || '';
  }

  set accessToken(tokenValue: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, `${this.BEARER}${tokenValue}`);
  }

  get refreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY) || '';
  }

  set refreshToken(tokenValue: string) {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, `${this.BEARER}${tokenValue}`);
  }

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const url = this.LOGIN_ENDPOINT;
    const body = { username, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap<AuthResponse>(
        ({ uid, name, email, username, accessToken, refreshToken }) => {
          this.user = { uid, name, email, username };
          this.accessToken = accessToken;
          this.refreshToken = refreshToken;
        }
      ),
      map(({ name }) => ({
        displayName: name,
        message: this.SUCCESS_LOGIN_MESSAGE,
      }))
    );
  }

  register(user: RegisterUser) {
    return this.createUser(user).subscribe(({ username, password }) => {
      return this.login(username, password);
    });
  }

  validateAndRefreshToken(): Observable<boolean> {
    if (!this.refreshToken) {
      console.log('no se encontró token');
      return of(false);
    }
    console.log('renovando token...');
    const headers = new HttpHeaders().set(
      this.AUTHORIZATION,
      this.refreshToken
    );
    return this.http
      .post<AuthResponse>(this.REFRESH_ENDPOINT, null, { headers })
      .pipe(
        map(({ uid, name, email, username, accessToken, refreshToken }) => {
          this.user = { uid, name, email, username };
          this.accessToken = accessToken;
          this.refreshToken = refreshToken;
          return true;
        }),
        catchError((err) => {
          // const { error } = err;
          // this.toastService.presentToast(
          //   error.message || GENERIC_ERROR_MESSAGE
          // );
          return of(false);
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  createUser(user: RegisterUser) {
    const url = this.REGISTER_ENDPOINT;
    const body = user;

    return this.http.post<RegisterUser>(url, body);
  }
}
