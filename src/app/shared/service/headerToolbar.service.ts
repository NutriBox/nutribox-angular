import { HeaderToolBar } from './../model/header-toolbar.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderToolbarService {

  private _headerToolBarData = new BehaviorSubject<HeaderToolBar>({
    title: 'Dashboard',
    icon: 'home',
    routUrl: ''
  });

constructor() { }

get headerToolBarData(): HeaderToolBar {
    return this._headerToolBarData.value
}

set headerToolBarData(headerToolBarData: HeaderToolBar){
   this._headerToolBarData.next(headerToolBarData);
}

}
