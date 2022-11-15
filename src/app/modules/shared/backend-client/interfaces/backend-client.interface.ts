import { Observable } from "rxjs";
import { IGameDataItem } from "@app/services/storage/interfaces";

export interface IBackendClient {
    getAllGameObject<T extends IGameDataItem>(url: string): Observable<T[]>;
    getGameObject<T extends IGameDataItem>(url: string, id: string): Observable<T>;
    getRequest<T>(url: string | string[], option: string): Observable<T>;
}