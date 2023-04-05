import { IGameDataItem } from '@app/services/storage/interfaces';

export interface IOngoingGame extends IGameDataItem {
  title: string;
  lastUpdate: string;
  thumbnailId?: string;
  statusTitle: string;
}
