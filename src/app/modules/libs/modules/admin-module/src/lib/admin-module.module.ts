import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AdminModuleRoutes } from './enums';
import { AdminContentLayoutComponent } from './layout';
import { GameListComponent } from './pages/game-list/game-list.component';
import { NewGameFormComponent } from './pages/new-game-form/new-game-form.component';
import { NewResourceFormComponent } from './pages/new-resource-form/new-resource-form.component';
import { ResourceListComponent } from './pages/resource-list/resource-list.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminContentLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: AdminModuleRoutes.GameList,
        pathMatch: 'full',
      },
      {
        path: AdminModuleRoutes.GameList,
        component: GameListComponent,
      },
      {
        path: AdminModuleRoutes.NewGameForm,
        component: NewGameFormComponent,
      },
      {
        path: AdminModuleRoutes.NewResourceForm,
        component: NewResourceFormComponent,
      },
      {
        path: AdminModuleRoutes.ResourceList,
        component: ResourceListComponent,
      },
      {
        path: '**',
        redirectTo: AdminModuleRoutes.GameList,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    AdminContentLayoutComponent,
    ResourceListComponent,
    NewResourceFormComponent,
    NewGameFormComponent,
    GameListComponent,
  ],
  providers: [],
})
export class AdminModuleModule {}
