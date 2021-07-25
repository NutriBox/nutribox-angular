import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/shared/material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutes } from './authentication.routing';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TemplateModule } from '../template/template.module';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthenticationRoutes,
    TemplateModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    NgxSpinnerModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ]
})
export class AuthenticationModule { }
