import { NgxSpinnerService } from 'ngx-spinner';
import { SnackBarAlertService } from './../../../../shared/service/snackBarAlert.service';
import { PessoaService } from '../../services/pessoa.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

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
    userId: ['']
}); }

  ngOnInit(): void {

  }

  closeCardErro(): void {
    if (this.errorMessage !== '') {
      this.errorMessage = '';
      this.erroMsg = '';
    }
  }

  salvaPessoa(): void {
    this.spinner.show();
    this.pessoaService.create(this.frmPessoa.value).subscribe(res => {
      this.sn.showMensage('A pessoa ' + this.frmPessoa.get('nome').value + ' alterada com sucesso!', 'successPanel');
      this.router.navigateByUrl('home/pessoa/list');
      this.spinner.hide();
    },
      err => {
        this.erroMsg = err.error.msg;
        this.errorMessage = err.error.erros[0].message;
        this.spinner.hide();
      });
  }
}
