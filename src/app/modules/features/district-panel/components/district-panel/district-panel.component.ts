import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import {
  IMapStateService,
  IMapTile,
  MAP_STATE_SERVICE,
} from '@app/features/map-view';

@Component({
  selector: 'app-district-panel',
  templateUrl: './district-panel.component.html',
  styleUrls: ['./district-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DistrictPanelComponent {
  @Input() district: IMapTile;

  constructor(
    @Inject(MAP_STATE_SERVICE)
    private readonly mapStateService: IMapStateService
  ) {
    this.district = this.mapStateService.getBlankMapTile();
  }
}
