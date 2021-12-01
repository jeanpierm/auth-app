import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  @ViewChild('dt', { static: true }) dt!: Table;
  users!: User[];
  loading: boolean = true;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      this.loading = false;
    });
  }

  test(event: any) {
    this.dt.filterGlobal(event.target.value, 'contains');
  }
}
