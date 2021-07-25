import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pessoa } from '../model/pessoa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  page = 0;
  linesPerPage = 5;
  orderBy = 'idPessoa';
  direction = 'ASC';

  private apiServer = environment.HTTP_API;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.apiServer + 'pessoas/');
  }

  getId(id): Observable<Pessoa> {
    return this.http.get<Pessoa>(this.apiServer + `pessoas/${id}`);
  }

  create(pessoas): Observable<Pessoa> {
    return this.http.post<Pessoa>(this.apiServer + 'pessoas/', JSON.stringify(pessoas), this.httpOptions);
  }

  update(id, pessoas): Observable<Pessoa> {
    return this.http.put<Pessoa>(this.apiServer + 'pessoas/' + id, JSON.stringify(pessoas), this.httpOptions);
  }

  delete(id): Observable<Pessoa> {
    return this.http.delete<Pessoa>(this.apiServer + 'pessoas/' + id, this.httpOptions);
  }


  getAllPage(pageNumber: number, pageSize: number, sortOrdem: string): Observable<Pessoa[]> {
    let params = new HttpParams();

    params = params.append('page', String(pageNumber));
    params = params.append('size', String(pageSize));
    params = params.append('sort', String(sortOrdem));
    return this.http.get<Pessoa[]>(this.apiServer + 'pessoas/page', {params});
  }
    constructor(private http: HttpClient) { }
}
