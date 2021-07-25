import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../../shared/shared.module';
import { DelComponent } from './components/del/del.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { MaterialModule } from '../../shared/material-module';
import { PessoaRoutesModule } from './pessoa.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent,
    DelComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    PessoaRoutesModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    SharedModule
    ],
  entryComponents: [CreateComponent],
})
export class PessoaModule { }
