import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuIcons, SideMenuSection } from '@app/shared-pack-module';
import { AdminModuleRoutes } from 'src/app/modules/libs/modules/admin-module/src/lib/enums';
import { PlayerModuleRoutes } from '../../enums';

@Component({
  selector: 'app-player-content-layout',
  templateUrl: './player-content-layout.component.html',
  styleUrls: ['./player-content-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerContentLayoutComponent {
  readonly PlayerRoutes = PlayerModuleRoutes;

  playerMenuLayout: SideMenuSection[] = [
    {
      label: '',
      options: [
        {
          label: 'Lista gier',
          icon: MenuIcons.List,
          path: PlayerModuleRoutes.OngoingGameList,
        },
        {
          label: 'Nowa gra',
          icon: MenuIcons.Registration,
          path: PlayerModuleRoutes.JoinGameForm,
        },
        {
          label: 'Ustawienia',
          icon: MenuIcons.Castle,
          path: PlayerModuleRoutes.Settings,
        },
      ],
    },
  ];

  constructor(private router: Router) {}

  onLinkClick(route: string) {
    console.log(`Navigate to: ${route}`);
    this.router.navigate([route]);
  }

  onActivate(componentRef: any) {
    console.log('Route activated');
  }
}
