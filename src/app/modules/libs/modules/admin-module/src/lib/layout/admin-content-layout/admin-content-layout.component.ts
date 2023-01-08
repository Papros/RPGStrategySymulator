import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-content-layout',
  templateUrl: './admin-content-layout.component.html',
  styleUrls: ['./admin-content-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContentLayoutComponent {
  constructor(private router: Router) {}

  onLinkClick(route: string) {
    console.log(`Navigate to: ${route}`);
    this.router.navigate([route]);
  }

  onActivate(componentRef: any) {
    console.log('Route activated');
  }
}
