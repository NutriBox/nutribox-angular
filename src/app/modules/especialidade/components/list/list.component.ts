import { BreadcrumbService } from './../../../../shared/service/breadcrumb.service';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Especialidades } from './../../model/especialidade';
import { EspecialidadeService } from './../../services/especialidade.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  dataSource = new MatTableDataSource<Especialidades>();
  page = 0;
  size = 5;
  order = 'idEspecialidade,asc';
  totalElements: number;
  pageEvent: PageEvent;
  sortEvent: Sort;
  showFiller = false;
  actionId: number;
  isDone = false;
  displayedColumns: string[] = ['idEspecialidade', 'nomeEspecialidade', 'acao'];

  constructor(
    private especialidadeService: EspecialidadeService,
    private spinner: NgxSpinnerService,
    private breadcrumbService: BreadcrumbService
    )
    {
      this.breadcrumbService.changeNewTitleBread('Especialidade');
    }

  ngOnInit(): void {
    this.initDataSource();
  }


  initDataSource(): void {
    this.spinner.show();
    this.especialidadeService.getAllPage(this.page, this.size, this.order).subscribe(
      (data: Especialidades[]) => {
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

    this.especialidadeService.getAllPage(this.page, this.size, this.order).subscribe(
      (data: Especialidades[]) => {
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
      this.especialidadeService.getAllPage(this.page, this.size, this.order).subscribe(
        (data: Especialidades[]) => {
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
