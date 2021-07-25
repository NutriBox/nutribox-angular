import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { MaterialModule } from 'src/app/shared/material-module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBreadcrumbComponent } from 'src/app/shared/components/nav-breadcrumb/nav-breadcrumb.component';
@NgModule({
  declarations: [ContainerComponent, MenuComponent, SidebarComponent, NavbarComponent, NavBreadcrumbComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    ContainerComponent,
    NavBreadcrumbComponent
  ]

})
export class TemplateModule { }
