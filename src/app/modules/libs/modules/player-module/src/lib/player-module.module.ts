import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { PlayerModuleRoutes } from './enums';
import { PlayerContentLayoutComponent } from './layout/player-content-layout/player-content-layout.component';
import { OngoingGameListComponent } from './pages/during-game-list/ongoing-game-list.component';
import { EndedGameListComponent } from './pages/ended-game-list/ended-game-list.component';
import { JoinGameFormComponent } from './pages/join-game-form/join-game-form.component';
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
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes)],
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
