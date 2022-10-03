import { IKingdom } from "@app/services/storage/interfaces";

export interface IMapTile {
  id: string;
  kingdom?: IKingdom;
  position: { x: number, y: number}; 
}
