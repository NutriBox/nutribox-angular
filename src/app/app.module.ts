import { DashboardModule } from './modules/dashboard/dashboard.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SidebarModule } from 'ng-sidebar';

import { RouterModule } from '@angular/router';
import { TemplateModule } from './core/template/template.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material-module';
import { PessoaModule } from './modules/pessoa/pessoa.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from './core/authentication/authentication.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    PessoaModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    TemplateModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DashboardModule,
    NgbModule,
    SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
