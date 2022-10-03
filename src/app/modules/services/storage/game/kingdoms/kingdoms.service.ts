import { Injectable } from "@angular/core";
import { IKingdom } from "@app/services/storage/interfaces";
import { GameDataService } from "@app/services/storage/generic";
import { ApiPaths } from "@app/shared/backend-client";
import { Observable, take } from "rxjs";

@Injectable()
export class KingdomsService extends GameDataService<IKingdom> {

    override loggerPrefix = "KingdomsService";

    fetchItems(): Observable<IKingdom[]> {
        let request = this.backendClient.getAllGameObject<IKingdom>(ApiPaths.Kingdoms);
        request.pipe(take(1)).subscribe((data: IKingdom[]) => { this.items = data; this.logger.info('Kingdoms API request.', this.loggerPrefix)});
        return request;
    }
    
}
