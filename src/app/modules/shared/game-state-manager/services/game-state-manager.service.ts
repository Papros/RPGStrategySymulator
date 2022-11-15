import { Inject, Injectable } from "@angular/core";
import { DistrictsService, DISTRICTS_SERVICE, KingdomsService, KINGDOMS_SERVICE, MapService, MAP_SERVICE } from "@app/services/storage/game";
import { GameDataService } from "@app/services/storage/generic";
import { IDistrict, IKingdom } from "@app/services/storage/interfaces";
import { IGameStateManager } from "../interfaces/game-state-manager.interface";

@Injectable()
export class GameStateManager implements IGameStateManager {

    constructor(
        @Inject(KINGDOMS_SERVICE) private kingdomsService: KingdomsService,
        @Inject(DISTRICTS_SERVICE) private districtService: DistrictsService,
        @Inject(MAP_SERVICE) private mapService: MapService,
    ) {}
    
    fetchData(): void {
        this.kingdomsService?.fetchItems();
        this.districtService?.fetchItems();
        this.mapService?.fetchItems();
    }

    getDistrictsManager(): GameDataService<IDistrict> {
        return this.districtService;
    }
    getKingdomsManager(): GameDataService<IKingdom> {
        return this.kingdomsService;
    }

}