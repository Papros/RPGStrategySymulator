import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './enums';
import {
  MainMenuPageComponent,
  LoginPageComponent,
  AdminPageComponent,
  UserPageComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: `/${AppRoutes.UserPanel}`,
  },
  {
    path: AppRoutes.MainMenu,
    component: MainMenuPageComponent,
  },
  {
    path: AppRoutes.Login,
    component: LoginPageComponent,
  },
  {
    path: AppRoutes.GameMasterPanel,
    component: AdminPageComponent,
  },
  {
    path: AppRoutes.UserPanel,
    component: UserPageComponent,
  },
  {
    path: '**',
    redirectTo: `/${AppRoutes.UserPanel}`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
