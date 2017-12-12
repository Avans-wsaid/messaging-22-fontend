import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Messaging 2.2';
  isCollapsed: boolean;

  constructor() { }

  ngOnInit() {
  }

}
