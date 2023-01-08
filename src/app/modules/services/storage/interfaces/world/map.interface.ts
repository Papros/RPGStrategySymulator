import { IDistrict, IKingdom } from ".";
import { IGameDataItem } from "../generic";

export interface IMap extends IGameDataItem {
    info: string,
    map: IDistrict[];
    kingdoms: IKingdom[];
};
