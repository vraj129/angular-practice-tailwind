import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isButtonVisible = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRouteAndToggleButton();
      }
    });
  }
  checkRouteAndToggleButton() {
    const currentRoute = this.router.url;
    this.isButtonVisible = currentRoute !== '/user/add';
  }
}
