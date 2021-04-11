import { HeaderToolbarService } from './../../../../shared/service/headerToolbar.service';
import { Convidados } from './../../model/convidado';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConvidadoService } from '../../services/convidado.service';

export interface GithubApi {
  items: Convidados[];
  total_count: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'nome', 'acao'];
  dataSource = new MatTableDataSource<Convidados>();
  actionId: number;
  isDone = false ;
  isLoading = true;



  constructor(private convidadoService: ConvidadoService, headerToolBarService: HeaderToolbarService) {

    headerToolBarService.headerToolBarData = {
      title: 'Convidado',
      icon: 'contact_page',
      routUrl: '/dashboard'
    };

   }

  ngOnInit(): void {
    this.convidadoService.getAll().subscribe((data: Convidados[]) => {
      console.log(data);
      this.dataSource =  new MatTableDataSource<Convidados>(data);
      this.validaIsDone(data);
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    this.convidadoService.getAll().subscribe((data: Convidados[]) => {
      this.dataSource =  new MatTableDataSource<Convidados>(data);
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
