import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { RepuestosComponent } from './pages/repuestos/repuestos.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  declarations: [RepuestosComponent, AdminComponent, UsersComponent],
  imports: [
    CommonModule,
    PrimengModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
