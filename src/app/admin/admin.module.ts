import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { RepuestosComponent } from './pages/repuestos/repuestos.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersDialogComponent } from './components/users/users-dialog/users-dialog.component';
import { UsersTableComponent } from './components/users/users-table/users-table.component';

@NgModule({
  declarations: [
    RepuestosComponent,
    AdminComponent,
    UsersComponent,
    UsersDialogComponent,
    UsersTableComponent,
  ],
  imports: [
    CommonModule,
    PrimengModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
