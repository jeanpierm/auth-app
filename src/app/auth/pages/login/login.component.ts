import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GENERIC_ERROR_MESSAGE } from 'src/app/app.messages';
import { RepuestosComponent } from 'src/app/admin/pages/repuestos/repuestos.component';
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from '../register/register.component';
import { AdminComponent } from 'src/app/admin/admin.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  static readonly PATH = '/auth/login';

  submitting: boolean = false;
  loginForm: FormGroup = this.fb.group({
    username: ['jeanpierm', [Validators.required]],
    password: ['314159', [Validators.required]],
  });

  get registerPath() {
    return RegisterComponent.PATH;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    }
    this.submitting = true;
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: ({ displayName, message }) => {
        this.router.navigateByUrl(AdminComponent.PATH);
        this.messageService.add({
          severity: 'success',
          summary: `Welcome ${displayName}`,
          detail: message,
        });
      },
      error: (err) => {
        const { error } = err;
        this.messageService.add({
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
}
