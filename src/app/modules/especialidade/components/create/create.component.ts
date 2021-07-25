import { NgxSpinnerService } from 'ngx-spinner';
import { EspecialidadeService } from './../../services/especialidade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarAlertService } from 'src/app/shared/service/snackBarAlert.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  frmEspecialidade: FormGroup;
  erroMsg = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private especialidadeService: EspecialidadeService,
    private sn: SnackBarAlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
     this.frmEspecialidade = this.fb.group({
      id: [''],
      nomeEspecialidade: ['', Validators.required ]
    });
  }

  closeCardErro(): void {
    if (this.errorMessage !== '') {
      this.errorMessage = '';
      this.erroMsg = '';
    }
  }

  salvaEspecialidade(): void {
    this.spinner.show();
    this.especialidadeService.create(this.frmEspecialidade.value).subscribe(res => {
      this.sn.showMensage('A especialidade ' + this.frmEspecialidade.get('nomeEspecialidade').value + ' cadastrado com sucesso!', 'successPanel');
      this.router.navigateByUrl('home/especialidade');
      this.spinner.hide();
    },
    err => {
      console.log(err);
      this.erroMsg = err.error.msg;
      this.errorMessage = err.error.erros[0].message;
      this.spinner.hide();
    });

  }

}
