import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PlayerModuleRoutes } from '../../enums';

@Component({
  selector: 'app-player-content-layout',
  templateUrl: './player-content-layout.component.html',
  styleUrls: ['./player-content-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerContentLayoutComponent {
  readonly PlayerRoutes = PlayerModuleRoutes;
  constructor(private router: Router) {}

  onLinkClick(route: string) {
    console.log(`Navigate to: ${route}`);
    this.router.navigate([route]);
  }

  onActivate(componentRef: any) {
    console.log('Route activated');
  }
}
