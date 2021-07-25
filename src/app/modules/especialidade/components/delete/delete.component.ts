import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EspecialidadeService } from '../../services/especialidade.service';
import { SnackBarAlertService } from 'src/app/shared/service/snackBarAlert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  selectId = 0;
  nameExclud = '';
  erroMsg = '';
  errorMessage = '';

  constructor(
    private router: Router,
    private especialidadeService: EspecialidadeService,
    private sn: SnackBarAlertService,
    private spinner: NgxSpinnerService,
    private parametro: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.parametro.params.subscribe(id => {
      this.selectId = id.id;
    });
    this.especialidadeService.getId(this.selectId).subscribe(dados => {
      this.nameExclud = dados.nomeEspecialidade;
      this.spinner.hide();
    });
  }

  deleteEspecialidade(): void {
    this.spinner.show();
    this.especialidadeService.delete(this.selectId).subscribe(dados => {
      this.sn.showMensage('O especialidade foi exluída com sucesso!', 'successPanel');
      this.router.navigateByUrl('home/especialidade');
      this.spinner.hide();
    }, err => {
      console.log(err);
      this.erroMsg = err.error.msg;
      this.errorMessage = err.error.status;
      this.spinner.hide();
    });
  }

}
