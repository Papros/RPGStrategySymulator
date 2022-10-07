import { ChangeDetectionStrategy, Component, Inject, Input } from "@angular/core";
import { IMapService, IMapTile, MAP_SERVICE } from "@app/features/map-view";

@Component({
    selector: 'district-panel',
    templateUrl: './district-panel.component.html',
    styleUrls: ['./district-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class DistrictPanelComponent {
    @Input() district: IMapTile;

    constructor(
        @Inject(MAP_SERVICE) private readonly mapService: IMapService,
    ) {
        this.district = this.mapService.getBlankMapTile();
    }

  }