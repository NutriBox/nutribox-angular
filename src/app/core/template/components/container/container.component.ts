import { TokenStorageService } from 'src/app/core/authentication/services/token-storage.service';
import { HeaderToolbarService } from './../../../../shared/service/headerToolbar.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private headerToolBarService: HeaderToolbarService,
    private tokenStorage: TokenStorageService
    ) { }

  ngOnInit(): void {
  }

  get title(){
    return this.headerToolBarService.headerToolBarData.title
  }
  get icon(){
    return this.headerToolBarService.headerToolBarData.icon
  }
  get routUrl(){
    return this.headerToolBarService.headerToolBarData.routUrl
  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(){
    this.tokenStorage.remove();
    this.reloadPage();
  }

}
