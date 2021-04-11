import { SnackBarAlertService } from './../../../../shared/service/snackBarAlert.service';
import { ConvidadoService } from '../../services/convidado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-del',
  templateUrl: './del.component.html',
  styleUrls: ['./del.component.css']
})
export class DelComponent implements OnInit {

  selectId = 0;

  constructor(
    private parametro: ActivatedRoute,
    private router: Router,
    private convidadoService: ConvidadoService,
    private sn: SnackBarAlertService

  ) { }

  ngOnInit(): void {
    this.parametro.params.subscribe(id => {
      this.selectId = id.id;
    });

  }

  deleteConvidado() {
    this.convidadoService.delete(this.selectId).subscribe(dados => {
      this.sn.showMensage('O convidado foi exluido com sucesso!', 'successPanel')
      this.router.navigateByUrl('home/convidado/list');
    });
  }



}
