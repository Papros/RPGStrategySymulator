import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import {
  IMapTile,
  MAP_STATE_SERVICE,
  IMapStateService,
} from '@app/features/map-view';
import { IKingdom, IDistrict } from '@app/services/storage/interfaces';
import {
  GAME_STATE_MANAGER,
  IGameStateManager,
} from '@app/shared/game-state-manager';
import { LOGGER_SERVICE, ILoggerService } from '@app/shared/logger';
import { BasicListItemModel } from 'src/app/modules/libs/packages/shared-pack/basic-list';
import { ColumnDisplayType } from 'src/app/modules/libs/packages/shared-pack/basic-list/enums';
import { ListConfiguration } from 'src/app/modules/libs/packages/shared-pack/basic-list/factory/list-configuration.factory';
import { IListConfiguration } from 'src/app/modules/libs/packages/shared-pack/basic-list/interfaces/list.interface';
import { IOngoingGame } from '../interface';
import { OngoingGameListService } from '../services';

@Component({
  selector: 'app-ongoing-game-list',
  templateUrl: './ongoing-game-list.component.html',
  styleUrls: ['./ongoing-game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OngoingGameListComponent {
  private readonly logPrefix = 'OngoingGameListPage';

  public gameList: IOngoingGame[];

  public listConfig: IListConfiguration<IOngoingGame> = { columns: [] };

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Inject(LOGGER_SERVICE) private logger: ILoggerService,
    @Inject(GAME_STATE_MANAGER) public gameStateManager: IGameStateManager,
    private ongoingGameListService: OngoingGameListService
  ) {
    this.gameList = [];
    this.initList();

    this.ongoingGameListService
      .fetchItems()
      .subscribe((ongoingGameList: IOngoingGame[]) => {
        this.gameList = ongoingGameList;
        this.logger.debug(
          `OngoingGameList fetched: ${this.gameList.length}`,
          this.logPrefix
        );
      });
  }

  ngOnInit(): void {}

  public mapGameListToItems(): BasicListItemModel[] {
    return this.gameList.map((mapItem: IOngoingGame): BasicListItemModel => {
      return {
        label: mapItem.title,
      };
    });
  }

  private initList() {
    this.listConfig = new ListConfiguration<IOngoingGame>()
      .pushColumn({
        id: 'gameId',
        headerName: 'Game Id',
        field: 'id',
        sortable: true,
        displayType: ColumnDisplayType.SimpleString,
      })
      .pushColumn({
        id: 'gameName',
        headerName: 'Game Title',
        field: 'title',
        sortable: true,
        displayType: ColumnDisplayType.SimpleString,
      })
      .build();
  }
}
