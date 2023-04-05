import { Injectable } from '@angular/core';
import { GameDataService } from '@app/services/storage/generic';
import { Observable, of } from 'rxjs';
import { IOngoingGame } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class OngoingGameListService extends GameDataService<IOngoingGame> {
  fetchItems(): Observable<IOngoingGame[]> {
    return of([
      {
        id: 'assdad123',
        title: 'Gra Testowa 1',
        lastUpdate: '',
        statusTitle: 'Zapisy',
      },
      {
        id: 'asdawew122',
        title: 'Gra Testowa 2',
        lastUpdate: '',
        statusTitle: 'Tura 5',
      },
    ]);
  }
}
