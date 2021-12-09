import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/admin/interfaces/user.interface';
import { UsersService } from 'src/app/admin/services/users.service';
import { GENERIC_ERROR_MESSAGE } from 'src/app/app.messages';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
})
export class UsersDialogComponent {
  submitting: boolean = false;
  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private message: MessageService,
    public usersService: UsersService
  ) {}

  isInvalid(controlName: string) {
    const control = this.userForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      return;
    }
    this.submitting = true;
    const { name, email, username, password } = this.userForm.value;
    const user: User = { name, email, username, password };
    this.usersService.createUser(user).subscribe({
      next: (_) => {
        this.usersService.loadUsers();
        this.message.add({
          severity: 'success',
          summary: `User created successfully!`,
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
        this.usersService.displayDialog = false;
        this.submitting = false;
      },
    });
  }

  closeDialog() {
    this.usersService.displayDialog = false;
  }
}
