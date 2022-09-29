import { ModuleWithProviders, NgModule } from "@angular/core";
import { GAME_STATE_MANAGER } from "./game-state-manager.module.types";
import { GameStateManager } from "./services/game-state-manager.service";
@NgModule()
export class GameStateManagerModule {
    public static forRoot(): ModuleWithProviders<GameStateManagerModule> {
        return {
            ngModule: GameStateManagerModule,
            providers: [{
                provide: GAME_STATE_MANAGER,
                useClass: GameStateManager,
            }],
        };
    }
}