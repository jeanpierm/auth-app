import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  static readonly baseUrl: string = 'api/users';

  users: User[] = [];
  loadingTable: boolean = true;
  displayDialog: boolean = false;

  constructor(private http: HttpClient) {}

  loadUsers(): void {
    !this.loadingTable && (this.loadingTable = true);
    this.getUsers().subscribe((users) => {
      this.users = users;
      this.loadingTable = false;
    });
  }

  getUsers() {
    const url = UsersService.baseUrl;
    return this.http.get<User[]>(url);
  }

  createUser(user: User) {
    const url = UsersService.baseUrl;
    const body = user;
    return this.http.post<User>(url, body);
  }

  removeUser(userId: number) {
    const url = `${UsersService.baseUrl}/${userId}`;
    return this.http.delete<void>(url);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
