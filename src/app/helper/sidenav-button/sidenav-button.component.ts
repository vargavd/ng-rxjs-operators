import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sidenav-button',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './sidenav-button.component.html',
  styleUrl: './sidenav-button.component.scss'
})
export class SidenavButtonComponent {
  @Input() link: string = '';
  @Input() text: string = '';
  @Input() active: boolean = false;
}
