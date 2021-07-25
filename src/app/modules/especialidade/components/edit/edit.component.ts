import { EspecialidadeService } from './../../services/especialidade.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarAlertService } from 'src/app/shared/service/snackBarAlert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  selectId = 0;
  frmEspecialidade: FormGroup;
  erroMsg = '';
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private especialidadeService: EspecialidadeService,
    private sn: SnackBarAlertService,
    private spinner: NgxSpinnerService,
    private parametro: ActivatedRoute,
  ) {
    this.frmEspecialidade = this.fb.group({
      idEspecialidade: [''],
      nomeEspecialidade: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.parametro.params.subscribe(id => {
      this.selectId = id.id;
    });
    this.especialidadeService.getId(this.selectId).subscribe(dados => {
      this.frmEspecialidade.setValue(dados);
      this.spinner.hide();
    });

  }

  salvaEspecialidade(): void{
    this.spinner.show();
    this.especialidadeService.update(this.selectId, this.frmEspecialidade.value).subscribe(res => {
      this.sn.showMensage('A especialidade ' + this.frmEspecialidade.get('nomeEspecialidade').value + ' alterada com sucesso!', 'successPanel');
      this.router.navigateByUrl('home/especialidade');
      this.spinner.hide();
    },
      err => {
        this.erroMsg = err.error.msg;
        this.errorMessage = err.error.erros[0].message;
        this.spinner.hide();
      });
  }
}
