import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { IDistrict, IKingdom } from "@app/services/storage/interfaces";
import { GAME_STATE_MANAGER, IGameStateManager } from "@app/shared/game-state-manager";

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class UserPageComponent implements OnInit, OnDestroy {

    public kingdomsList: IKingdom[] = [];
    public map: IDistrict[] = [];

    constructor(
      private readonly cdr: ChangeDetectorRef,
      @Inject(GAME_STATE_MANAGER) public gameStateManager: IGameStateManager,
    ) {
      this.gameStateManager.fetchData();
    }

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
    
    ngOnInit(): void {
        this.gameStateManager.getKingdomsManager().fetchItems().subscribe((items:IKingdom[]) => {
          this.kingdomsList = items;
          console.log('Kingdoms fetched...');
          this.cdr.markForCheck();
        })
        
        this.gameStateManager.getDistrictsManager().fetchItems().subscribe((items:IDistrict[]) => {
          this.map = items;
          console.log('Kingdoms fetched...');
          this.cdr.markForCheck();
        })
    }

  }