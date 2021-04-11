import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material-module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EspecialidadeRoutingModule } from './especialidade-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { DeleteComponent } from './components/delete/delete.component';
import { EditComponent } from './components/edit/edit.component';


@NgModule({
  declarations: [ListComponent, CreateComponent, DeleteComponent, EditComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    EspecialidadeRoutingModule,
    MaterialModule
  ]
})
export class EspecialidadeModule { }
