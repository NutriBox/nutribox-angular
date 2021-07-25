import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private AUTH_API = environment.HTTP_API + 'auth/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signin', {
      username,
      password
    }, this.httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signup', {
      username,
      email,
      password
    }, this.httpOptions);
  }

}

