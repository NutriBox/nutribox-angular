import { BreadcrumbService } from './../../../../shared/service/breadcrumb.service';
import { NavbarService } from './../../services/navbar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sideBarToggle: string;
  newTitle: string;


  constructor(
    private navbarService: NavbarService,
    private breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.sideBarToggle = this.navbarService.getStateSideBar().value;
    this.newTitle = this.breadcrumbService.getNewTitleBread().value;
  }

  ativaBtn(): void {
    if (this.sideBarToggle === '') {
      this.sideBarToggle = 'active';
      this.navbarService.changeStateSideBar(this.sideBarToggle);
    } else {
      this.sideBarToggle = '';
      this.navbarService.changeStateSideBar(this.sideBarToggle);
    }
  }

}
