import { Inject, Injectable, OnInit } from "@angular/core";
import { IGameDataItem, IKingdom } from "@app/services/storage/interfaces";
import { GameDataService } from "@app/services/storage/generic";
import { ApiPaths, BACKEND_CLIENT_SERVICE, IBackendClient } from "@app/shared/backend-client";
import { Observable, take } from "rxjs";

@Injectable()
export class KingdomsService extends GameDataService<IKingdom> implements OnInit {

    fetchItems(): Observable<IKingdom[]> {
        let request = this.backendClient.getAllGameObject<IKingdom>(ApiPaths.Kingdoms);
        request.pipe(take(1)).subscribe((data: IKingdom[]) => { this.items = data});
        return request;
    }
    
}
