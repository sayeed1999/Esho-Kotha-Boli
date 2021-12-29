import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'account-section',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom // not working
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
