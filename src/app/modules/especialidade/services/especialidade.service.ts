import { map } from 'rxjs/operators';
import { Especialidade } from './../model/especialidade';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  page = 0;
  linesPerPage = 5;
  orderBy = 'idEspecialidade';
  direction = 'ASC';

  private apiServer = environment.HTTP_API;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAll(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(this.apiServer + 'especialidades/');
  }

  getId(id): Observable<Especialidade> {
    return this.http.get<Especialidade>(this.apiServer + `especialidades/${id}`);
  }

  create(especialidade): Observable<Especialidade> {
    return this.http.post<Especialidade>(this.apiServer + 'especialidades/', JSON.stringify(especialidade), this.httpOptions);
  }

  update(id, especialidade): Observable<Especialidade> {
    return this.http.put<Especialidade>(this.apiServer + 'especialidades/' + id, JSON.stringify(especialidade), this.httpOptions);
  }

  delete(id) {
    return this.http.delete<Especialidade>(this.apiServer + 'especialidades/' + id, this.httpOptions);
  }

  getAllPage(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(`${this.apiServer}especialidades/page?page=${this.page}&linesPerPage=${this.linesPerPage}&orderBy=${this.orderBy}&direction=${this.direction}`)
    .pipe(
      map(res =>  res['content'])
    );
  }

  constructor(private http: HttpClient) { }

}
