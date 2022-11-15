import { Injectable } from "@angular/core";
import { IKingdom, IMap } from "@app/services/storage/interfaces";
import { GameDataService } from "@app/services/storage/generic";
import { ApiPaths } from "@app/shared/backend-client";
import { Observable, take } from "rxjs";

@Injectable()
export class MapService extends GameDataService<IMap> {

    override loggerPrefix = "MapService";

    fetchItems(): Observable<IMap[]> {
        let request = this.backendClient.getRequest<IMap[]>(ApiPaths.Map, "");
        request.pipe(take(1)).subscribe((data: IMap[]) => { this.items = data; this.logger.info('Map API response.', this.loggerPrefix)});
        return request;
    }

    getRandomMap(option: string): Observable<IMap> {
        let request = this.backendClient.getRequest<IMap>(ApiPaths.Map_Random, option);
        request.pipe(take(1)).subscribe((data: IMap) => { this.items = [data]; this.logger.info('Map API response.', this.loggerPrefix)});
        return request;
    }
    
}
