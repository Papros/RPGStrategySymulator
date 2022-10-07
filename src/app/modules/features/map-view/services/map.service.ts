import { ChangeDetectorRef, Inject, Injectable, OnDestroy, OnInit } from "@angular/core";
import { IKingdom, IDistrict, ResourceType, TerrainType } from "@app/services/storage/interfaces";
import { GAME_STATE_MANAGER, IGameStateManager } from "@app/shared/game-state-manager";
import { ILoggerService, LOGGER_SERVICE } from "@app/shared/logger";
import { Subject } from "rxjs";
import { Observable, Subscription } from "rxjs";
import { IMapService } from "../interfaces";
import { IMapTile } from "../interfaces/map-tile.interface";

@Injectable()
export class MapService implements IMapService, OnInit, OnDestroy{

  private readonly logPrefix = "MAP_SERVICE";

  private kingdomsList: IKingdom[] = [];
  private districtList: IDistrict[] = [];
  private kingdomMap: Map<string, IKingdom> = new Map<string, IKingdom>();
  private districtMap: Map<string, IDistrict> = new Map<string, IDistrict>();
  private map: IMapTile[][] = [];
  private mapSubject: Subject<IMapTile[][]> = new Subject();
  private mapSubscribtion$: Subscription = new Subscription;

  constructor(
    @Inject(LOGGER_SERVICE) private logger: ILoggerService,
    @Inject(GAME_STATE_MANAGER) public gameStateManager: IGameStateManager,
  ) {
    this.subscribeForMapData();
    this.gameStateManager.fetchData();
    this.logger.info("MapService constructor.", this.logPrefix );
  }

  getBlankDistrict(): IDistrict {
    return {
      id: '0',
      kingdomID: '0',
      position: { x: 0, y: 0},
      resource: { type: ResourceType.NOTHING },
      terrain: { type: TerrainType.FIELDS },
    }
  }

  getBlankMapTile(): IMapTile {
    return {
      id: '0',
      position: { x: 0, y: 0},
      district: this.getBlankDistrict(),
    };
  }

  subscribeMap(): Subject<IMapTile[][]> {
    return this.mapSubject;
  }

  getMap(): IMapTile[][] {
    return this.map;
  }

  ngOnDestroy(): void {
    this.mapSubscribtion$.unsubscribe();
  }

  subscribeForMapData(): void {
    let sub$_1 = this.gameStateManager.getKingdomsManager().fetchItems().subscribe((items:IKingdom[]) => {
  
      this.logger.info('Kingdoms fetched.', this.logPrefix);

      if(items != this.kingdomsList) {
        this.kingdomsList = items;
        this.kingdomMap.clear();
        items.forEach( (item:IKingdom) => {
          this.kingdomMap.set(item.id, item);
        }
        );
        this.buildMap();
      }
    });
    
    let sub$_2 = this.gameStateManager.getDistrictsManager().fetchItems().subscribe((items:IDistrict[]) => {
      
      this.logger.info('District fetched.', this.logPrefix);

      if(this.districtList != items){
        this.districtList = items;
        this.districtMap.clear();
        items.forEach( (item:IDistrict) => {
          this.districtMap.set(item.id, item);
        }
        );
        this.buildMap();
      }
    });
    this.mapSubscribtion$.add(sub$_1);
    this.mapSubscribtion$.add(sub$_2);
  }

  generateEmptyMap(x: number, y: number) : IMapTile[][] {
    this.logger.debug(`generateEmptyMap(${x}, ${y})`, this.logPrefix);
    let emptyMap: IMapTile[][] = [];
    let emptyRow: IMapTile[] = [];
    let emptyTile: IMapTile = {
      id: "-1",
      kingdom: undefined,
      position: {x: -1,y: -1},
      district: this.getBlankDistrict(),
    };

    for(let size_y = 0; size_y<y; size_y++) {
      emptyRow.push(JSON.parse(JSON.stringify(emptyTile)));
    }

    for(let size_x = 0; size_x<x; size_x++) {
      emptyMap.push(JSON.parse(JSON.stringify(emptyRow)));
    }

    return emptyMap;
  }

  buildMap(): void {
    if(this.districtList.length > 0 && this.kingdomsList.length > 0) {
      let lastDistrict = this.districtList[this.districtList.length - 1];
      this.map = this.generateEmptyMap(lastDistrict.position.x+1, lastDistrict.position.y+1);

      for(let district of this.districtList) {
        this.map[district.position.x][district.position.y] = {
          id: district.id,
          kingdom: this.kingdomMap.get(district.kingdomID),
          position: district.position,
          district: district,
        };
      }
      this.mapSubject.next(this.map);
    } else {
      this.logger.debug('buildMap() called but not all list are fetched yet...', this.logPrefix);
    }
  }

  ngOnInit(): void {
    
  }

  centerMapAt(x_cord: number, y_cord: number): boolean {
    throw new Error("Method not implemented.");
  }

  getCurrentCenter(): { x_cord: number; y_cord: number; } {
    throw new Error("Method not implemented.");
  }

}