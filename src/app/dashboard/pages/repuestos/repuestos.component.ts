import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/pages/login/login.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
})
export class RepuestosComponent {
  static readonly PATH = '/dashboard/repuestos';

  get user() {
    return this.authService.authUser;
  }

  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl(LoginComponent.PATH);
  }
}
