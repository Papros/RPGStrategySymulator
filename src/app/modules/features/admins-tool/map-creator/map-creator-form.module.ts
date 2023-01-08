import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  GameCreatorFormComponent,
  MapCreatorFormComponent,
} from './components';
import { GAME_CREATOR_SERVICE } from './map-creator.module.types';
import { GameCreatorService } from './services/game-creator.service';

@NgModule({
  declarations: [GameCreatorFormComponent, MapCreatorFormComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [GameCreatorFormComponent],
})
export class MapCreatorFormModule {
  public static forRoot(): ModuleWithProviders<MapCreatorFormModule> {
    return {
      ngModule: MapCreatorFormModule,
      providers: [
        {
          provide: GAME_CREATOR_SERVICE,
          useClass: GameCreatorService,
        },
      ],
    };
  }
}
