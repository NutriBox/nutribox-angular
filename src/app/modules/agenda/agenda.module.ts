import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from './../../shared/shared.module';
import { MaterialModule } from './../../shared/material-module';
import { AgendaRoutesModule } from './agenda.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);


@NgModule({
  imports: [
    CommonModule,
    AgendaRoutesModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    FullCalendarModule,
    NgxSpinnerModule
  ],
  declarations: [AgendaComponent],
  exports: [AgendaComponent]
})
export class AgendaModule { }
