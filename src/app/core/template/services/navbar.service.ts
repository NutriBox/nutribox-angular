import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private navBarActiveSideBar = new BehaviorSubject<string>('');

  constructor() { }

  changeStateSideBar(valor: string): void {
    this.navBarActiveSideBar.next(valor);
  }

  getStateSideBar(){
    return this.navBarActiveSideBar;
  }

}
