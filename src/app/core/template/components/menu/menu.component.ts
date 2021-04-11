import { SubMenu } from './../../model/menu';
import { MenuService } from './../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { Menu } from '../../model/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  panelOpenState = false;
  itemMenu: Menu[] = [];
  itemSub: SubMenu[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit() {

    this.menuService.getMenuAll().subscribe(data => {
      this.itemMenu = data.filter(a => {if (a.active){ return a;} });
      console.log(data);
    });

    this.menuService.getSubAll().subscribe(data => {
      this.itemSub = data.filter(a => {if (a.active){ return a;} });
      console.log(data);
    });


  }


}
