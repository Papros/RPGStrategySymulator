import { Inject, Injectable } from '@angular/core';
import { IDistrict } from '@app/services/storage/interfaces';
import { IBackendClient, ApiPaths } from '@app/shared/backend-client';

import { LOGGER_SERVICE, ILoggerService } from '@app/shared/logger';
import { Observable, of, take, tap } from 'rxjs';
import { BACKEND_CLIENT_SERVICE } from 'src/app/modules/shared/backend-client/backend-client.module.types';
import { ICreationRules, IGameCreatorService } from '../interfaces';

@Injectable()
export class GameCreatorService implements IGameCreatorService {
  private readonly loggerPrefix = 'GameCreationService';

  public constructor(
    @Inject(LOGGER_SERVICE) protected logger: ILoggerService,
    @Inject(BACKEND_CLIENT_SERVICE) protected backendClient: IBackendClient
  ) {}

  generateMap(rules: ICreationRules): Observable<IDistrict[]> {
    let request = this.backendClient.postRequest<IDistrict[]>(
      ApiPaths.MapGenerate,
      { rules: rules }
    );
    return request.pipe(
      take(1),
      tap(() => this.logger.info('GenerateMap request.', this.loggerPrefix))
    );
  }
}
