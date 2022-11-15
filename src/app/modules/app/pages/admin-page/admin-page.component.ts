import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { IMapTile, MAP_STATE_SERVICE, IMapStateService } from "@app/features/map-view";
import { MapService, MAP_SERVICE } from "@app/services/storage/game";
import { IKingdom, IDistrict } from "@app/services/storage/interfaces";
import { GAME_STATE_MANAGER, IGameStateManager } from "@app/shared/game-state-manager";
import { LOGGER_SERVICE, ILoggerService } from "@app/shared/logger";

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class AdminPageComponent implements OnInit, OnDestroy {

    private readonly logPrefix = "AdminPage";

    public kingdomsList: IKingdom[] = [];
    public map: IDistrict[] = [];
    public selectedDistrict: IMapTile;
    public isLeftHidden = true;
    public isRightHidden = true;

    constructor(
      private readonly cdr: ChangeDetectorRef,
      @Inject(GAME_STATE_MANAGER) public gameStateManager: IGameStateManager,
      @Inject(MAP_STATE_SERVICE) private mapStateService: IMapStateService,
      @Inject(LOGGER_SERVICE) private logger: ILoggerService,
    ) {
      this.gameStateManager.fetchData();
      this.selectedDistrict = this.mapStateService.getBlankMapTile();
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
      this.isRightHidden = false
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

    public generateMapFromSeed() {
      this.logger.debug(`Randomize map: `, this.logPrefix);
      this.mapStateService.generateMapFromSeed('1234');
      this.cdr.markForCheck();
    }

  }