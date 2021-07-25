import { BreadcrumbService } from './../../../../shared/service/breadcrumb.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pessoa } from './../../model/pessoa';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PessoaService } from '../../services/pessoa.service';

export interface GithubApi {
  items: Pessoa[];
  total_count: number;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource<Pessoa>();
  page = 0;
  size = 5;
  order = 'idPessoa,asc';
  totalElements: number;
  pageEvent: PageEvent;
  sortEvent: Sort;
  showFiller = false;
  actionId: number;
  isDone = false;
  displayedColumns: string[] = ['idPessoa', 'nome', 'cpf', 'dataNascimento', 'acao'];

  constructor(
    private pessoaService: PessoaService,
    private spinner: NgxSpinnerService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.breadcrumbService.changeNewTitleBread('Pessoa');
  }

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource(): void {
    this.spinner.show();
    this.pessoaService.getAllPage(this.page, this.size, this.order).subscribe(
      (data: Pessoa[]) => {
        this.totalElements = data['totalElements'];
        this.validaIsDone(data['content']);
        this.dataSource = data['content'];
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      }
    );
  }

  onPaginateChange(event: PageEvent): void {
    this.spinner.show();
    this.page = event.pageIndex;
    this.size = event.pageSize;

    this.pessoaService.getAllPage(this.page, this.size, this.order).subscribe(
      (data: Pessoa[]) => {
        this.validaIsDone(data['content']);
        this.dataSource = data['content'];
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      }
    );

  }

  onOrdemItens(): void {
    this.spinner.show();
    this.page = this.page;
    this.order = this.sortEvent.active + ',' + this.sortEvent.direction;
    this.pessoaService.getAllPage(this.page, this.size, this.order).subscribe(
      (data: Pessoa[]) => {
        this.validaIsDone(data['content']);
        this.dataSource = data['content'];
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      }
    );
  }

  validaIsDone(data): void {
    if (data.length > 0) {
      this.isDone = true;
    } else {
      this.isDone = false;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getIdTable(id: number): void {
    this.actionId = id;
  }


}
