import { NgxSpinnerService } from 'ngx-spinner';
import { SnackBarAlertService } from '../../../../shared/service/snackBarAlert.service';
import { PessoaService } from '../../services/pessoa.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  selectId = 0;
  frmPessoa: FormGroup;
  erroMsg = '';
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pessoaService: PessoaService,
    private sn: SnackBarAlertService,
    private spinner: NgxSpinnerService,
    private parametro: ActivatedRoute,
  ) {
    this.frmPessoa = this.fb.group({
      idPessoa: [{value: '', disabled: true}, Validators.required],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      idTipoPessoa: ['', Validators.required],
      userId: []
    });
  }

  ngOnInit(): void {
    this.spinner.show();
    this.parametro.params.subscribe(id => {
      this.selectId = id.id;
    });
    this.pessoaService.getId(this.selectId).subscribe(dados => {
      this.frmPessoa.setValue(dados);
      this.spinner.hide();
    });
  }

  salvaPessoa(): void {
    this.spinner.show();
    this.pessoaService.update(this.selectId, this.frmPessoa.value).subscribe(res => {
      this.sn.showMensage('A pessoa ' + this.frmPessoa.get('nome').value + ' alterada com sucesso!', 'successPanel');
      this.router.navigateByUrl('home/pessoa');
      this.spinner.hide();
    },
      err => {
        this.erroMsg = err.error.msg;
        this.errorMessage = err.error.erros[0].message;
        this.spinner.hide();
      });
  }

}



