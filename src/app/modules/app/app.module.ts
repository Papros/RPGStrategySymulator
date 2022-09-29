import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PROVIDERS } from '@app/providers';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderModule } from '@app/shared/loader';
import { LoaderScreenModule } from '@app/shared/loader-screen';
import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './components/app-root/app-root.component';
import { AdminPageComponent, LoginPageComponent, MainMenuPageComponent, UserPageComponent } from './pages';
import { LoggerModule } from '@app/shared/logger';
import { BackendClientModule } from '@app/shared/backend-client';
import { DistrictsServiceModule, KingdomsServiceModule } from '@app/services/storage/game';
import { GameStateManagerModule } from '@app/shared/game-state-manager';
import { HttpClientModule } from '@angular/common/http';

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
    BackendClientModule.forRoot(),
    LoaderModule.forRoot(),
    LoggerModule.forRoot(),
    KingdomsServiceModule.forRoot(),
    DistrictsServiceModule.forRoot(),
    GameStateManagerModule.forRoot(),
  ],
  providers: PROVIDERS,
  bootstrap: [AppRootComponent]
})
export class AppModule { }
