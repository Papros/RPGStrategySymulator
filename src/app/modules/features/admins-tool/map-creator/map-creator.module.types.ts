import { IGameCreatorService } from './interfaces';
import { InjectionToken } from '@angular/core';

export const GAME_CREATOR_SERVICE = new InjectionToken<IGameCreatorService>(
  'GAME_CREATOR_SERVICE'
);
