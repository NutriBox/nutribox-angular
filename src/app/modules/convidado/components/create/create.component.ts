import { SnackBarAlertService } from './../../../../shared/service/snackBarAlert.service';
import { ConvidadoService } from '../../services/convidado.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private convidadoService: ConvidadoService,
    private sn: SnackBarAlertService
  ) { }

  frmConvidado: FormGroup;

  ngOnInit(): void {

    this.frmConvidado = this.fb.group({
      id: [''],
      nome: ['', Validators.required ]
    });
  }

  salvaConvidado() {
    this.convidadoService.create(this.frmConvidado.value).subscribe(res => {
      tap(v => (console.log(v = res.nome)));
      this.sn.showMensage("O convidado " + res.nome + " cadastrado com sucesso!", "successPanel");
      this.router.navigateByUrl('home/convidado/list');
    });

  }
}
