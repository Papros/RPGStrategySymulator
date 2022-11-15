import { ChangeDetectionStrategy, Component, Inject, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IMapStateService, IMapTile, MAP_STATE_SERVICE } from "@app/features/map-view";

@Component({
    selector: 'app-map-creator-form',
    templateUrl: './map-creator-form.component.html',
    styleUrls: ['./map-creator-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class MapCreatorFormComponent {
    @Input() district: IMapTile;

    mapCreatorForm = new FormGroup({
        generatorSeed: new FormControl(0,[Validators.maxLength(8)]),
        waterArea: new FormControl(0, [Validators.min(0), Validators.max(10)]),
        landIntegrity: new FormControl(0, [Validators.min(0), Validators.max(10)]),
        biomeSize: new FormControl(0, [Validators.min(0), Validators.max(10)]),
      });

    constructor(
        @Inject(MAP_STATE_SERVICE) private readonly mapStateService: IMapStateService,
    ) {
        this.district = this.mapStateService.getBlankMapTile();

    }

    public generateMap() {
        this.mapStateService.generateMapFromSeed('1234');
    }

  }