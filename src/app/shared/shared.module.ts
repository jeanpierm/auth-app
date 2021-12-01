import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { PrimengModule } from '../primeng/primeng.module';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [TopbarComponent, MenuComponent],
  imports: [CommonModule, RouterModule, PrimengModule],
  exports: [TopbarComponent, MenuComponent],
})
export class SharedModule {}
