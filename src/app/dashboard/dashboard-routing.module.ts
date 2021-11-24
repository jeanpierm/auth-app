import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepuestosComponent } from './pages/repuestos/repuestos.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'repuestos', component: RepuestosComponent },
      { path: '**', redirectTo: 'repuestos' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
