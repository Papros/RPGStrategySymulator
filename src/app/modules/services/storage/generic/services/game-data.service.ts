import { Inject, Injectable, OnInit } from '@angular/core';
import { ILoggerService, LOGGER_SERVICE } from '@app/shared/logger';
import { Observable, Subject } from 'rxjs';
import {
  BACKEND_CLIENT_SERVICE,
  IBackendClient,
} from '../../../../shared/backend-client';
import { IGameDataItem } from '../../interfaces/generic/game-data-item.interface';
import { IGameDataService } from '../interfaces/game-data-service.interface';

@Injectable()
export abstract class GameDataService<T extends IGameDataItem>
  implements IGameDataService<IGameDataItem>, OnInit
{
  protected items: T[];
  protected itemSubscription: Subject<T[]>;
  protected loggerPrefix: string = `GameDataService<T>`;

  public constructor(
    @Inject(BACKEND_CLIENT_SERVICE) protected backendClient: IBackendClient,
    @Inject(LOGGER_SERVICE) protected logger: ILoggerService
  ) {
    this.items = [];
    this.itemSubscription = new Subject<T[]>();
  }

  ngOnInit(): void {
    this.logger.info('constructor()', 'GameDataService<T>');
  }

  getItems(): T[] {
    return this.items;
  }

  updateItems(newItems: T[]): void {
    this.items = newItems;
    this.itemSubscription.next(this.items);
    this.logger.debug(`Items updated: ${newItems}`, this.loggerPrefix);
  }

  getItem(id: string): T | null {
    let _items = this.items.find((item) => item.id == id);

    return _items ? _items : null;
  }

  clearItems(): boolean {
    this.items = [];
    return true;
  }

  watchForUpdates(): Subject<T[]> {
    return this.itemSubscription;
  }

  abstract fetchItems(): Observable<T[]>;
}
