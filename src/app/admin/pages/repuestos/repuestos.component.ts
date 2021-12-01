import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
})
export class RepuestosComponent {
  static readonly PATH = '/admin/repuestos';

  get user() {
    return this.authService.authUser;
  }

  constructor(private authService: AuthService) {}
}
