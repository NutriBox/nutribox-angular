import { NavbarService } from './../../services/navbar.service';
import { TokenStorageService } from 'src/app/core/authentication/services/token-storage.service';
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

  isActiveSide = '';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navbarService: NavbarService,
    private tokenStorage: TokenStorageService
    ) { }

  ngOnInit(): void {
      this.navbarService.getStateSideBar().subscribe(changeToggle => {return this.isActiveSide = changeToggle});
  }

  reloadPage(): void {
    window.location.reload();
  }

  logout(){
    this.tokenStorage.remove();
    this.reloadPage();
  }

}
