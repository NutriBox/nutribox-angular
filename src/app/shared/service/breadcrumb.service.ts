import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  public newTitleBread = new BehaviorSubject<string>('');
  constructor() { }

  changeNewTitleBread(data): void {
    this.newTitleBread.next(data);
  }

  getNewTitleBread(): any {
    return this.newTitleBread;
  }

}
