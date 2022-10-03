import { IGameDataItem } from "../generic";

export interface IDistrict extends IGameDataItem {
  id: string;
  kingdomID: string;
  position: { x: number, y: number}; 
}