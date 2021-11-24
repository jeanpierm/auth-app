import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RepuestosComponent } from './pages/repuestos/repuestos.component';

@NgModule({
  declarations: [RepuestosComponent],
  imports: [
    CommonModule,
    PrimengModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
