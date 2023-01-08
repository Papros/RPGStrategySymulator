import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PROVIDERS } from '@app/providers';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderModule } from '@app/shared/loader';
import { LoaderScreenModule } from '@app/shared/loader-screen';
import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './components/app-root/app-root.component';
import {
  AdminPageComponent,
  LoginPageComponent,
  MainMenuPageComponent,
  UserPageComponent,
} from './pages';
import { LoggerModule } from '@app/shared/logger';
import { BackendClientModule } from '@app/shared/backend-client';
import {
  DistrictsServiceModule,
  KingdomsServiceModule,
  MapServiceModule,
} from '@app/services/storage/game';
import { GameStateManagerModule } from '@app/shared/game-state-manager';
import { HttpClientModule } from '@angular/common/http';
import { MapPanelModule } from '@app/features/map-view';
import { DistrictPanelModule } from '@app/features/district-panel';
import { SidePanelModule } from '@app/features/side-panel';
import { MapCreatorFormModule } from '@app/features/admin-tools';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppRootComponent,
    MainMenuPageComponent,
    LoginPageComponent,
    UserPageComponent,
    AdminPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoaderScreenModule,
    HttpClientModule,
    DistrictPanelModule,
    LoggerModule.forRoot(),
    BackendClientModule.forRoot(),
    MapCreatorFormModule.forRoot(),
    KingdomsServiceModule.forRoot(),
    DistrictsServiceModule.forRoot(),
    LoaderModule.forRoot(),
    SidePanelModule,
    MapPanelModule.forRoot(),
    GameStateManagerModule.forRoot(),
    MapServiceModule.forRoot(),
  ],
  providers: PROVIDERS,
  bootstrap: [AppRootComponent],
})
export class AppModule {}
