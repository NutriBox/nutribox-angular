import { Observable } from 'rxjs';
import { AgendaModel } from './../model/agenda.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private apiServer = environment.HTTP_API;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAll(): Observable<AgendaModel[]> {
    return this.http.get<AgendaModel[]>(this.apiServer + 'agendas/');
  }

  getId(id): Observable<AgendaModel> {
    return this.http.get<AgendaModel>(this.apiServer + `agendas/${id}`);
  }

  create(agenda): Observable<AgendaModel> {
    return this.http.post<AgendaModel>(this.apiServer + 'agendas/', JSON.stringify(agenda), this.httpOptions);
  }

  update(id, agenda): Observable<AgendaModel> {
    return this.http.put<AgendaModel>(this.apiServer + 'agendas/' + id, JSON.stringify(agenda), this.httpOptions);
  }

  delete(id): Observable<any> {
    return this.http.delete<AgendaModel>(this.apiServer + 'agendas/' + id, this.httpOptions);
  }


  constructor(private http: HttpClient) { }
}
