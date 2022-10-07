import { IGameDataItem } from "../generic";

export interface IDistrict extends IGameDataItem {
  id: string;
  kingdomID: string;
  position: { x: number, y: number};
  terrain: {
    type: TerrainType,
  },
  resource: {
    type: ResourceType,
  } 
}

export enum TerrainType  {
  FIELDS = "FIELDS",
  MOUNTAINS = "MOUNTAINS",
  SNOW="SNOW",
  DESERT="DESERT",
  FOREST="FOREST",
  JUNGLE="JUNGLE",
  SEA ="SEA"
}

export enum ResourceType {
  IRON = 'IRON',
  WOOD = 'WOOD',
  GOLD = 'GOLD',
  HORSES = 'HORSES',
  FOOD = 'FOOD',
  NOTHING = 'NOTHING',
}