import { BreadcrumbService } from './../../shared/service/breadcrumb.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private breadcrumbService: BreadcrumbService) {
      this.breadcrumbService.changeNewTitleBread('Deashboard');
   }

}
