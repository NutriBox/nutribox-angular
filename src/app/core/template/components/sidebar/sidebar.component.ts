import { NavbarService } from './../../services/navbar.service';
import { TokenStorageService } from 'src/app/core/authentication/services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sideBarToggle = '';
  currentUser: any;
  version = '1.0.0.1';
  constructor(
    private token: TokenStorageService,
    private navbarService: NavbarService
  ) { }

  ngOnInit(): void {
    this.navbarService.getStateSideBar().subscribe(changeToggle =>  this.sideBarToggle = changeToggle );
    this.currentUser = this.token.getUser();
  }


}
