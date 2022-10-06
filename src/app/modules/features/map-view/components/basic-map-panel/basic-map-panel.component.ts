import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Inject, ChangeDetectorRef, ElementRef, ViewChild } from "@angular/core";
import { SafeStyle } from "@angular/platform-browser";
import { ILoggerService, LOGGER_SERVICE } from "@app/shared/logger";
import { Subscription } from "rxjs";
import { IMapService, IMapTile,  } from "../../interfaces";
import { MAP_SERVICE } from "../../map-view.module.types";

@Component({
  selector: 'basic-map-panel',
  templateUrl: './basic-map-panel.component.html',
  styleUrls: ['./basic-map-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicMapPanelComponent implements OnInit, OnDestroy {
  
  private readonly logPrefix = "BasicMapPanel"
  public mapTiles: IMapTile[][] = [];
  public mapSubscription$: Subscription = new Subscription();

  private tilesBackground = {
    basic: 'tile.png',
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Inject(MAP_SERVICE) public mapService: IMapService,
    @Inject(LOGGER_SERVICE) private logger: ILoggerService,
  ) {
    this.logger.debug("Map constructor.", this.logPrefix );
  }

  ngOnInit(): void {
    this.logger.debug("Map init.", this.logPrefix );
    this.mapSubscription$ = this.mapService.subscribeMap().subscribe((map: IMapTile[][]) => {
      this.mapTiles = map;
      this.logger.debug(`Map update: [${this.mapTiles.length}][${this.mapTiles[0]?.length}]`, this.logPrefix );
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.mapSubscription$?.unsubscribe();
  }

  public getTileStyles(tileId: string): string {
    return `assets/images/${this.tilesBackground.basic}`
  } 

}
