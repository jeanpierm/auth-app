import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = 'api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers() {
    const url = this.baseUrl;
    const headers = new HttpHeaders({
      Authorization: this.authService.accessToken,
    });

    return this.http.get<User[]>(url, { headers });
  }
}
