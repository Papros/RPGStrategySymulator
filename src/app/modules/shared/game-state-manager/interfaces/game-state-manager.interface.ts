import { GameDataService } from "@app/services/storage/generic";
import { IDistrict, IKingdom } from "@app/services/storage/interfaces";

export interface IGameStateManager {
    fetchData(): void;
    getDistrictsManager(): GameDataService<IDistrict>;
    getKingdomsManager(): GameDataService<IKingdom>;
}