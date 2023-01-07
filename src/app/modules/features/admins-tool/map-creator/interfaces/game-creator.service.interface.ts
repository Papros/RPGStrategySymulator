import { IDistrict } from '@app/services/storage/interfaces';
import { Observable } from 'rxjs';
import { ICreationRules } from './map-rules.interface';

export interface IGameCreatorService {
  generateMap(rules: ICreationRules): Observable<IDistrict[]>;
}
