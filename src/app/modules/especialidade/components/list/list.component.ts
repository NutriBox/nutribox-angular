import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { Especialidade } from './../../model/especialidade';
import { EspecialidadeService } from './../../services/especialidade.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit,  AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['idEspecialidade', 'nomeEspecialidade', 'acao'];
  dataSource = new MatTableDataSource<Especialidade>();
  actionId: number;
  isDone = false;
  constructor(
    private especialidadeService: EspecialidadeService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.especialidadeService.getAll().subscribe((data: Especialidade[]) => {
       this.validaIsDone(data);
       this.dataSource =  new MatTableDataSource<Especialidade>(data);
       this.spinner.hide();
    }, err => {
      this.spinner.hide();
    });

  }

  ngAfterViewInit() {
    this.especialidadeService.getAll().subscribe((data: Especialidade[]) => {
      this.dataSource =  new MatTableDataSource<Especialidade>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  validaIsDone(data){
    if (data.length > 0){
      this.isDone = true;
    }else{
      this.isDone = false;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getIdTable(id: number){
    this.actionId = id;
  }

}
