import { TokenStorageService } from 'src/app/core/authentication/services/token-storage.service';
import { Router } from '@angular/router';
import { SnackBarAlertService } from './../../shared/service/snackBarAlert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AgendaService } from './services/agenda.service';
import { AgendaModel } from './model/agenda.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/angular';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

import br from '@fullcalendar/core/locales/pt-br';
import { ElementRef } from '@angular/core';
import { EventDragStopArg } from '@fullcalendar/interaction';



@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  /* Faz referencia a modal */
  @ViewChild('agenda', { static: false }) Modal: ElementRef;
  @ViewChild('confirmAgenda', { static: false }) ModalconfirmAgenda: ElementRef;

  start: string;
  end: string;
  isEdit: boolean;
  isDayAll: boolean;
  isConfirm: boolean;
  agendaModel: AgendaModel[];
  dt: string;

  calendarOptions: CalendarOptions = {
    locale: br,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridDay,dayGridMonth,timeGridWeek,listWeek',
    },
    timeZone: 'UTC',
    initialDate: new Date(),
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.updateEventClick.bind(this),
    select: this.createDateSelect.bind(this),
    eventDragStop: this.handleEventDragStop.bind(this)
  };

  frmAgenda: FormGroup;
  erroMsg = '';
  errorMessage = '';


  constructor(
    private agendaService: AgendaService,
    private spinner: NgxSpinnerService,
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private sn: SnackBarAlertService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.frmAgenda = this.fb.group({
      id: [{ value: '', disabled: true }],
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      allDay: [''],
      backgroundColor: ['', Validators.required]
    });

    this.frmAgenda.valueChanges.subscribe(() => {
      if (this.frmAgenda.get('allDay').value === true) {
        this.isDayAll = true;
      } else {
        this.isDayAll = false;
      }
    });



  }

  cores = [
    { id: '#9823c9', name: 'Roxo' },
    { id: '#25c4fe', name: 'Azul' },
    { id: '#ffc24f', name: 'Amarelo' },
    { id: '#98d843', name: 'Verde' },
    { id: '#fe10a6', name: 'Rosa' },
    { id: '#fe3c3a', name: 'Vermelho' }
  ];


  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.spinner.show();
    this.agendaService.getAll().subscribe((data) => {
      this.calendarOptions.events = data.map(
        evt => {
          return { id: evt.id, title: evt.title, start: evt.start, end: evt.end, color: evt.backgroundColor };
        });
    });
    this.frmAgenda.reset();
    this.closeModalAgenda('agenda');
    this.spinner.hide();
  }

  closeCardErro(): void {
    if (this.errorMessage !== '') {
      this.errorMessage = '';
      this.erroMsg = '';
    }
  }

  salvaAgenda(): void {
    if (this.isEdit === false) {
      this.salveCreate();
    } else {
      this.salveUpdate();
    }
  }

  confirm(confirm: boolean): void {
    this.isConfirm = confirm;
    this.modalService.dismissAll(this.ModalconfirmAgenda);
    this.openModalAgenda('agenda');
  }

  salveCreate(): void {
    this.agendaModel = [{
      id: null,
      title: this.frmAgenda.get('title').value,
      start: moment.utc(this.frmAgenda.get('start').value).locale('pt-br').format('yyyy-MM-DD hh:mm:ss'),
      end: moment.utc(this.frmAgenda.get('end').value).locale('pt-br').format('yyyy-MM-DD hh:mm:ss'),
      allDay: this.frmAgenda.get('allDay').value !== true ? false : true,
      backgroundColor: this.frmAgenda.get('backgroundColor').value
    }];

    if (this.frmAgenda.get('title').value !== '') {
      this.agendaService.create(this.agendaModel[0]).subscribe(res => {
        this.sn.showMensage('O agendamento da ' + this.frmAgenda.get('title').value + ' foi cadastrado com sucesso!', 'successPanel');
        this.router.navigateByUrl('home/agenda');
        this.loadEvents();
      },
        err => {
          console.log(err);
          this.erroMsg = err.error.msg;
          this.errorMessage = err.error.erros[0].message;
          this.spinner.hide();
        });
    }
  }


  salveUpdate(): void {
    this.spinner.show();

    this.agendaModel = [{
      id: null,
      title: this.frmAgenda.get('title').value,
      start: moment.utc(this.frmAgenda.get('start').value).locale('pt-br').format('yyyy-MM-DD hh:mm:ss'),
      end: moment.utc(this.frmAgenda.get('end').value).locale('pt-br').format('yyyy-MM-DD hh:mm:ss'),
      allDay: this.frmAgenda.get('allDay').value !== true ? false : true,
      backgroundColor: this.frmAgenda.get('backgroundColor').value
    }];

    this.agendaService.update(this.frmAgenda.get('id').value, this.agendaModel[0]).subscribe(res => {
      this.sn.showMensage('O Agendamento ' + this.frmAgenda.get('title').value + ' foi alterada com sucesso!', 'successPanel');
      this.router.navigateByUrl('home/agenda');
      this.loadEvents();
    },
      err => {
        this.erroMsg = err.error.msg;
        this.errorMessage = err.error.erros[0].message;
        this.spinner.hide();
      });
  }


  openModalAgenda(agenda): void {
    this.modalService.open(this.Modal);
  }
  closeModalAgenda(agenda): void {
    this.modalService.dismissAll(this.Modal);
    this.frmAgenda.reset();
  }

  handleWeekendsToggle(): void {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  eventDidMount(): void {
    console.log(this.calendarOptions.events);
  }

  createDateSelect(selectInfo: DateSelectArg): void {
    alert( this.tokenStorageService.getUser().id );
    this.frmAgenda.reset();
    this.isEdit = false;
    this.frmAgenda.patchValue({
      allDay: selectInfo.allDay,
      start: moment.utc(selectInfo.startStr.replace('z', '')).locale('pt-br').format('yyyy-MM-DDTHH:mm:ss'),
      end: moment.utc(selectInfo.endStr.replace('z', '')).locale('pt-br').format('yyyy-MM-DDTHH:mm:ss')
    });
    this.openModalAgenda('agenda');

  }

  updateEventClick(clickInfo: EventClickArg): void {
    this.isEdit = true;
    this.modalService.open(this.ModalconfirmAgenda);
    this.spinner.show();
    this.agendaService.getId(clickInfo.event.id).subscribe(dados => {
      this.frmAgenda.patchValue({
        id: dados.id,
        title: dados.title,
        start: moment(dados.start).locale('pt-br').format('yyyy-MM-DDTHH:mm:ss'),
        end: moment(dados.end).locale('pt-br').format('yyyy-MM-DDTHH:mm:ss'),
        allDay: dados.allDay,
        backgroundColor: dados.backgroundColor
      });
      this.spinner.hide();
    });
    this.isConfirm = false;
  }

  handleEventDragStop(ev: EventDragStopArg): void {
    /* alert( moment.utc(ev.view.currentStart).locale('pt-br').format('yyyy-MM-DDTHH:mm:ss')); */
    // this.dt = moment.utc(ev.event._def.).locale('pt-br').format('yyyy-MM-DDTHH:mm:ss');

    console.log(ev);


  }


  excluirAgenda(): void {
    this.spinner.show();
    this.agendaService.delete(this.frmAgenda.get('id').value).subscribe(dados => {
      this.sn.showMensage('O agendamento foi exluída com sucesso!', 'successPanel');
      this.router.navigateByUrl('home/agenda');
      this.frmAgenda.reset();
      this.closeModalAgenda('agenda');
      this.loadEvents();
      this.spinner.hide();
    }, err => {
      console.log(err);
      this.erroMsg = err.error.msg;
      this.errorMessage = err.error.status;
      this.spinner.hide();
    });
  }


}
