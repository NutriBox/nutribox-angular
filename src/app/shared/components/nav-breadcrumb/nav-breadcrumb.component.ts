import { BreadcrumbService } from './../../service/breadcrumb.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-breadcrumb',
  templateUrl: './nav-breadcrumb.component.html',
  styleUrls: ['./nav-breadcrumb.component.css']
})

export class NavBreadcrumbComponent implements OnInit {
  routUrl = '';
  @Input() title: string;
  constructor(private breadcrumbService: BreadcrumbService) {
    this.title = this.breadcrumbService.getNewTitleBread().value;
  }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.title = this.breadcrumbService.getNewTitleBread().value;
  }

}
