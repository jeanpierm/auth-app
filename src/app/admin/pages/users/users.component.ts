import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  static readonly PATH: string = '/admin/users';

  ngOnInit(): void {}
}
