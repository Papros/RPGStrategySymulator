import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuIcons, SideMenuSection } from '@app/shared-pack-module';
import { AdminModuleRoutes } from '../../enums';

@Component({
  selector: 'app-admin-content-layout',
  templateUrl: './admin-content-layout.component.html',
  styleUrls: ['./admin-content-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContentLayoutComponent {
  readonly AdminRoutes = AdminModuleRoutes;

  adminMenuLayout: SideMenuSection[] = [
    {
      label: 'Menu',
      options: [
        {
          label: 'Lista gier',
          icon: MenuIcons.List,
          path: AdminModuleRoutes.GameList,
        },
        {
          label: 'Nowa gra',
          icon: MenuIcons.Registration,
          path: AdminModuleRoutes.NewGameForm,
        },
        {
          label: 'Zasoby',
          icon: MenuIcons.Widgets,
          path: AdminModuleRoutes.ResourceList,
        },
        {
          label: 'Nowy zasób',
          icon: MenuIcons.DrawAndDesign,
          path: AdminModuleRoutes.NewResourceForm,
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
