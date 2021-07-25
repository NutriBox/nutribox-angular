import { NavbarService } from './../../services/navbar.service';
import { TokenStorageService } from 'src/app/core/authentication/services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { version } from '../../../../../../../nutribox-angular/package.json';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sideBarToggle = '';
  currentUser: any;
  version = version;
  constructor(
    private token: TokenStorageService,
    private navbarService: NavbarService
  ) { }

  ngOnInit(): void {
    this.navbarService.getStateSideBar().subscribe(changeToggle => { return this.sideBarToggle = changeToggle });
    this.currentUser = this.token.getUser();
  }


}
