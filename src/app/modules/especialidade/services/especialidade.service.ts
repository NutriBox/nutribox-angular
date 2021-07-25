import { map } from 'rxjs/operators';
import { Especialidade, Especialidades } from './../model/especialidade';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  delete(id): Observable<any> {
    return this.http.delete<Especialidade>(this.apiServer + 'especialidades/' + id, this.httpOptions);
  }


  getAllPage(pageNumber: number, pageSize: number, sortOrdem: string): Observable<Especialidades[]> {
  let params = new HttpParams();

  params = params.append('page', String(pageNumber));
  params = params.append('size', String(pageSize));
  params = params.append('sort', String(sortOrdem));
  return this.http.get<Especialidades[]>(this.apiServer + 'especialidades/page', {params});
}

  constructor(private http: HttpClient) { }

}

