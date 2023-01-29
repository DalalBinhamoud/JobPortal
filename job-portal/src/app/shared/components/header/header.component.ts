import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showHeader = true;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route);

    // if (this.route.url.includes('login')) {
    //   this.showHeader = false; //hide header in login page
    // }
  }
}
