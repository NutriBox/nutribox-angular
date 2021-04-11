import { SnackBarAlertService } from '../../../../shared/service/snackBarAlert.service';
import { ConvidadoService } from '../../services/convidado.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  selectId = 0;
  frmConvidado: FormGroup;
  convidado = {};

  constructor(
    private parametro: ActivatedRoute,
    private fb: FormBuilder,
    private convidadoService: ConvidadoService,
    private sn: SnackBarAlertService,
    private router: Router
  ) {
    this.frmConvidado = this.fb.group({
      id: [''],
      nome: ['']
    });
  }


  ngOnInit(): void {
    this.parametro.params.subscribe(id => {
      this.selectId = id.id;
    });

    this.convidadoService.getId(this.selectId).subscribe(dados => {
      console.log(dados);
      this.frmConvidado.setValue(dados);
    });

  }

  salvarConvidado() {
    this.convidadoService.update(this.selectId, this.frmConvidado.value).subscribe(res => {
      console.log(res);
      this.sn.showMensage('Convidado ' + res.nome + ' editado com sucesso!', 'successPanel');
      this.router.navigateByUrl('home/convidado/list');
    });
  }


}



