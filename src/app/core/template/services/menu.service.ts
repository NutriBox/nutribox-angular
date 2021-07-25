import { SubMenu } from './../model/menu';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Menu } from '../model/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiServer = environment.HTTP_API;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getMenuAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiServer + 'menus');
  }

  getSubAll(): Observable<SubMenu[]> {
    return this.http.get<SubMenu[]>(this.apiServer + 'submenus');
  }
}
