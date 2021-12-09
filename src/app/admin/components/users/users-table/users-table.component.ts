import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Rol, User } from 'src/app/admin/interfaces/user.interface';
import { UsersService } from 'src/app/admin/services/users.service';
import { GENERIC_ERROR_MESSAGE } from 'src/app/app.messages';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  submitting: boolean = false;

  get loading() {
    return this.usersService.loadingTable;
  }

  get users() {
    return this.usersService.users;
  }

  constructor(
    private usersService: UsersService,
    private message: MessageService
  ) {}

  ngOnInit(): void {
    this.usersService.loadUsers();
  }

  showDialog(): void {
    this.usersService.displayDialog = true;
  }

  loadUsers() {
    this.usersService.loadUsers();
  }

  removeUser(userId: number): void {
    this.submitting = true;
    this.usersService.removeUser(userId).subscribe({
      next: () => {
        this.usersService.loadUsers();
        this.message.add({
          severity: 'success',
          summary: `User deleted successfully!`,
        });
      },
      error: (err) => {
        const { error } = err;
        if (!error) return;
        this.message.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || GENERIC_ERROR_MESSAGE,
        });
        this.submitting = false;
      },
      complete: () => {
        this.submitting = false;
      },
    });
  }

  showRoles(roles: Rol[]) {
    return roles
      .map((rol) => {
        switch (rol.name) {
          case 'ROLE_USER':
            return 'User';
          case 'ROLE_MANAGER':
            return 'Manager';
          case 'ROLE_ADMIN':
            return 'Admin';
          case 'ROLE_SUPER_ADMIN':
            return 'Sudo';
          default:
            return 'Undefined';
        }
      })
      .join(', ');
  }
}
