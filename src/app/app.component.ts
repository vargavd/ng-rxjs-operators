import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

// ANGULAR MATERIAL IMPORTS
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { filter } from 'rxjs';
import { SidenavButtonComponent } from './helper/sidenav-button/sidenav-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,

    // MATERIAL 
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,

    // ROUTING
    RouterOutlet,
    RouterModule,

    // CUSTOM
    SidenavButtonComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  currentUrl = '/';

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.url;
    });
  }
}
