import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu-bar',
  standalone: false,

  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css',
     './menu-bar-responsive.component.css']
})
export class MenuBarComponent {
  constructor(private router: Router) {}

  isHomePage(): boolean {
    return this.router.url === '/';
  }
}

