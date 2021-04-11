import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Convidados } from '../model/convidado';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConvidadoService {

  private apiServer = environment.HTTP_API_MOCK;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAll(): Observable<Convidados[]> {
    return this.http.get<Convidados[]>(this.apiServer + '/convidados/')
      .pipe(
        delay(0),
        catchError(this.errorHandler)
      );
  }

  getId(id): Observable<Convidados> {
    return this.http.get<Convidados>(this.apiServer + `/convidados/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  create(convidados): Observable<Convidados> {
    return this.http.post<Convidados>(this.apiServer + '/convidados/', JSON.stringify(convidados), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id, convidados): Observable<Convidados> {
    return this.http.put<Convidados>(this.apiServer + '/convidados/' + id, JSON.stringify(convidados), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id) {
    return this.http.delete<Convidados>(this.apiServer + '/convidados/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


  constructor(private http: HttpClient) { }
}
