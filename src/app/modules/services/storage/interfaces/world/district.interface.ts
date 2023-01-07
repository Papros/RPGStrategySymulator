import { IGameDataItem } from '../generic';
import { IResourceSource } from './resource-source.interface';
import { ITerrainState } from './terrain-state.interface';
import { ResourceType, TerrainType } from './world.enum';

export interface IDistrict extends IGameDataItem {
  id: string;
  kingdomID: string;
  position: { x: number; y: number };
  terrain: ITerrainState;
  resources: IResourceSource[];
}
