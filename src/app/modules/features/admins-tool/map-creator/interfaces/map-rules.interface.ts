import { ResourceType, TerrainType } from '@app/services/storage/interfaces';
import { CreationRulesAmountValue, CreationRulesSizeValue } from '../enums';

export interface ICreationRules {
  seed: number | string;
  size: { x: number; y: number };
  setIslands: CreationRulesAmountValue;
  resources: CreationRulesAmountValue;
  biomesSize: CreationRulesSizeValue;
  allowedResources: ResourceType[];
  allowedTerrain: TerrainType[];
  noiseValues: { amplitude: number; octaves: number };
}
