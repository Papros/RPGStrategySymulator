import { IDistrict } from "@app/services/storage/interfaces";
import { Subject } from "rxjs";
import { IMapTile } from "./map-tile.interface";

export interface IMapStateService {
  centerMapAt(x_cord: number, y_cord: number): boolean;
  getCurrentCenter(): {x_cord: number, y_cord: number};
  getMap(): IMapTile[][];
  subscribeMap(): Subject<IMapTile[][]>;
  getBlankDistrict(): IDistrict;
  getBlankMapTile(): IMapTile;
  generateMapFromSeed(seed: string): void;
}