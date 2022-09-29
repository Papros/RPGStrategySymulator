import { Injectable } from "@angular/core";
import { GameDataService } from "@app/services/storage/generic";
import { IDistrict, IGameDataItem } from "@app/services/storage/interfaces";
import { ApiPaths } from "@app/shared/backend-client";
import { Observable, take } from "rxjs";

@Injectable()
export class DistrictsService extends GameDataService<IDistrict>{

    fetchItems(): Observable<IDistrict[]> {
        let request = this.backendClient.getAllGameObject<IDistrict>(ApiPaths.Districts);
        request.pipe(take(1)).subscribe((data: IDistrict[]) => { this.items = data});
        return request;
    }
    
}