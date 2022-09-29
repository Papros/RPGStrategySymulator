import { InjectionToken } from "@angular/core";
import { IGameStateManager } from "./interfaces/game-state-manager.interface";

export const GAME_STATE_MANAGER = new InjectionToken<IGameStateManager>('GAME_STATE_MANAGER');