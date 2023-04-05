import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapCreatorFormModule } from '@app/features/admin-tools';
import { MapPanelModule } from '@app/features/map-view';
import { SharedPackModule } from '@app/shared-pack-module';
import { PlayerModuleRoutes } from './enums';
import { PlayerContentLayoutComponent } from './layout/player-content-layout/player-content-layout.component';
import { EndedGameListComponent } from './pages/ended-game-list/ended-game-list.component';
import { JoinGameFormComponent } from './pages/join-game-form/join-game-form.component';
import { OngoingGameListComponent } from './pages/ongoing-game-list';
import { PlayerSettingsComponent } from './pages/player-settings/player-settings.component';

export const routes: Routes = [
  {
    path: '',
    component: PlayerContentLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: PlayerModuleRoutes.OngoingGameList,
        pathMatch: 'full',
      },
      {
        path: PlayerModuleRoutes.OngoingGameList,
        component: OngoingGameListComponent,
      },
      {
        path: PlayerModuleRoutes.JoinGameForm,
        component: JoinGameFormComponent,
      },
      {
        path: PlayerModuleRoutes.OldGames,
        component: EndedGameListComponent,
      },
      {
        path: PlayerModuleRoutes.Settings,
        component: PlayerSettingsComponent,
      },
      {
        path: '**',
        redirectTo: PlayerModuleRoutes.OngoingGameList,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedPackModule,
    MapPanelModule,
    MapCreatorFormModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [
    PlayerContentLayoutComponent,
    OngoingGameListComponent,
    EndedGameListComponent,
    JoinGameFormComponent,
    PlayerSettingsComponent,
  ],
  providers: [],
})
export class PlayerModuleModule {}
