import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IDistrict,
  ResourceType,
  TerrainType,
} from '@app/services/storage/interfaces';
import {
  ApiPaths,
  BACKEND_CLIENT_SERVICE,
  IBackendClient,
} from '@app/shared/backend-client';
import {
  GAME_STATE_MANAGER,
  IGameStateManager,
} from '@app/shared/game-state-manager';
import { Observable, of, take, tap } from 'rxjs';
import {
  GAME_CREATOR_SERVICE,
  ICreationRules,
  IGameCreatorService,
} from '../..';

import { CreationRulesAmountValue, CreationRulesSizeValue } from '../../enums';

@Component({
  selector: 'app-map-creator-form',
  templateUrl: './map-creator-form.component.html',
  styleUrls: ['./map-creator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapCreatorFormComponent implements OnInit {
  mapCreatorForm = new FormGroup({
    generatorSeed: new FormControl(0, [Validators.maxLength(8)]),
    waterArea: new FormControl(0, [Validators.min(0), Validators.max(10)]),
    landIntegrity: new FormControl(0, [Validators.min(0), Validators.max(10)]),
    biomeSize: new FormControl(0, [Validators.min(0), Validators.max(10)]),
  });

  constructor(
    @Inject(GAME_STATE_MANAGER) private gameStateManager: IGameStateManager,
    @Inject(GAME_CREATOR_SERVICE)
    private gameCreatorService: IGameCreatorService
  ) {}

  ngOnInit(): void {}

  public generateMap() {
    console.log(
      'Generating map: ',
      this.mapCreatorForm.get('generatorSeed')?.value
    );

    let rules: ICreationRules = {
      seed: this.mapCreatorForm.get('generatorSeed')?.value,
      size: {
        x: 50,
        y: 50,
      },
      setIslands: CreationRulesAmountValue.NONE,
      resources: CreationRulesAmountValue.NONE,
      biomesSize: CreationRulesSizeValue.SMALL,
      allowedResources: [ResourceType.FOOD],
      allowedTerrain: [TerrainType.FIELDS, TerrainType.SEA],
      noiseValues: {
        amplitude: 4,
        octaves: 0.5,
      },
    };

    this.gameCreatorService.generateMap(rules).subscribe((map: IDistrict[]) => {
      this.gameStateManager.getDistrictsManager().updateItems(map);
    });
  }

  public getRandomSeed() {
    const randomSeed = Math.random() * 1000000;
    this.mapCreatorForm.get('generatorSeed')?.setValue(randomSeed);

    this.generateMap();
  }
}
