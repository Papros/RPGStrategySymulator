import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { IMapService, IMapTile, MAP_SERVICE } from "@app/features/map-view";
import { IDistrict, IKingdom } from "@app/services/storage/interfaces";
import { GAME_STATE_MANAGER, IGameStateManager } from "@app/shared/game-state-manager";
import { ILoggerService, LOGGER_SERVICE } from "@app/shared/logger";

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class UserPageComponent implements OnInit, OnDestroy {
    private readonly logPrefix = 'UserPage';

    public kingdomsList: IKingdom[] = [];
    public map: IDistrict[] = [];
    public selectedDistrict: IMapTile;
    public isLeftHidden = false;
    public isRightHidden = false;

    constructor(
      private readonly cdr: ChangeDetectorRef,
      @Inject(GAME_STATE_MANAGER) public gameStateManager: IGameStateManager,
      @Inject(MAP_SERVICE) private mapService: IMapService,
      @Inject(LOGGER_SERVICE) private logger: ILoggerService,
    ) {
      this.gameStateManager.fetchData();
      this.selectedDistrict = this.mapService.getBlankMapTile();
    }

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
    
    ngOnInit(): void {
        this.gameStateManager.getKingdomsManager().fetchItems().subscribe((items:IKingdom[]) => {
          this.kingdomsList = items;
          this.cdr.markForCheck();
        })
        
        this.gameStateManager.getDistrictsManager().fetchItems().subscribe((items:IDistrict[]) => {
          this.map = items;
          this.cdr.markForCheck();
        })
    }

    public selectedTile(tile: IMapTile) {
      this.logger.debug(`Selected: ${tile.id}`, this.logPrefix);
      this.selectedDistrict = tile;
      this.cdr.markForCheck();
    }

    public hideSidePanel(eventValue: boolean, left: boolean) {
      console.log(`hide: ${eventValue}, ${ left ? "LEFT" : "RIGHT" }_PANEL`);
      if(left) {
        this.isLeftHidden = eventValue;
      } else {
        this.isRightHidden = eventValue;
      }
      this.cdr.markForCheck();
    }

  }