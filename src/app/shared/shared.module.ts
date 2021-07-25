import { CpfCnpjPipe } from './pipes/CpfCnpjPipe';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'ng-sidebar';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SidebarModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  declarations: [
    CpfCnpjPipe
  ],
  exports: [
     SidebarModule,
     CpfCnpjPipe,
     NgxMaskModule
  ],
  bootstrap: [SharedModule]
})
export class SharedModule { }


