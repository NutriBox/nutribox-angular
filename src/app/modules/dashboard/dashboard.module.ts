import { DashboardRoutesModule } from './dashboard.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutesModule
  ],
  declarations: [DashboardComponent]
})

export class DashboardModule {

  constructor(){}
 }
