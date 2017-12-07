import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  title = 'Messaging 2.2';

  constructor() { }

  ngOnInit() {
  }

}
