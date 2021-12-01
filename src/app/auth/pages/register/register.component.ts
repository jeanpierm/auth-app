import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GENERIC_ERROR_MESSAGE } from 'src/app/app.messages';
import { RepuestosComponent } from 'src/app/admin/pages/repuestos/repuestos.component';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { RegisterUser } from '../../interfaces/register-user.interface';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './register.component.html',
  styles: [``],
})
export class RegisterComponent {
  static readonly PATH = '/auth/register';

  submitting: boolean = false;
  registerForm: FormGroup = this.fb.group(
    {
      name: ['Billy Gualpa', [Validators.required]],
      email: ['billy@gmail.com', [Validators.required, Validators.email]],
      username: ['billy', [Validators.required, Validators.minLength(3)]],
      password: ['12345', [Validators.required, Validators.minLength(5)]],
      password2: ['12345', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.equalControls('password', 'password2'),
      ],
    }
  );

  get loginPath() {
    return LoginComponent.PATH;
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password2() {
    return this.registerForm.get('password2');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validatorService: ValidatorService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  isInvalid(controlName: string) {
    const control = this.registerForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched);
  }

  register() {
    if (!this.registerForm.valid) {
      return;
    }
    const { name, email, username, password } = this.registerForm.value;
    const newUser: RegisterUser = { name, email, username, password };
    this.authService.createUser(newUser).subscribe({
      next: (_) => {
        this.authService.login(newUser.username, newUser.password).subscribe({
          next: ({ displayName, message }) => {
            this.router.navigateByUrl(RepuestosComponent.PATH);
            this.messageService.add({
              severity: 'success',
              summary: `Welcome ${displayName}`,
              detail: message,
            });
          },
          error: (err) => {
            console.error('Error on login new user', err);
            const { error } = err;
            if (!error) return;
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
      },
      error: (err) => {
        console.error('Error on create new user', err);
        const { error } = err;
        if (!error) return;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || GENERIC_ERROR_MESSAGE,
        });
      },
    });
  }
}
