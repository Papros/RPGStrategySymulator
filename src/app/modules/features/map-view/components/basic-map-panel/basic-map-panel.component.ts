import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, Inject, ChangeDetectorRef, Output, EventEmitter } from "@angular/core";
import { ILoggerService, LOGGER_SERVICE } from "@app/shared/logger";
import { Subscription } from "rxjs";
import { IMapStateService, IMapTile,  } from "../../interfaces";
import { MAP_STATE_SERVICE } from "../../map-view.module.types";

@Component({
  selector: 'app-basic-map-panel',
  templateUrl: './basic-map-panel.component.html',
  styleUrls: ['./basic-map-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicMapPanelComponent implements OnInit, OnDestroy {
  
  private readonly logPrefix = "BasicMapPanel"

  @Output() selectedMapTile = new EventEmitter<IMapTile>();

  private tilesBackground = {
    basic: 'tile.png',
  }

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Inject(MAP_STATE_SERVICE) public mapStateService: IMapStateService,
    @Inject(LOGGER_SERVICE) private logger: ILoggerService,
  ) {
    this.logger.debug("Map constructor.", this.logPrefix );
  }
  
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
    this.logger.debug("Map init.", this.logPrefix );
  }

  public selectMapTile(tile: IMapTile) {
    this.logger.debug(`Selected: ${ tile.id }`, this.logPrefix);
    this.selectedMapTile.emit(tile);
  }

  public getTileStyles(tileId: string): string {
    return `assets/images/${this.tilesBackground.basic}`
  } 

}
