import { SnackBarAlertService } from './../../../../shared/service/snackBarAlert.service';
import { PessoaService } from '../../services/pessoa.service';
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
    private pessoaService: PessoaService,
    private sn: SnackBarAlertService

  ) { }

  ngOnInit(): void {
    this.parametro.params.subscribe(id => {
      this.selectId = id.id;
    });

  }

  deletePessoa(): void {
    this.pessoaService.delete(this.selectId).subscribe(dados => {
      this.sn.showMensage('A pessoa foi exluido com sucesso!', 'successPanel')
      this.router.navigateByUrl('home/pessoa/list');
    });
  }



}
