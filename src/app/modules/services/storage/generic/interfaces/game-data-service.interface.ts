import { Observable } from "rxjs";
import { IGameDataItem } from "../../interfaces/generic";

export interface IGameDataService<T extends IGameDataItem> {
    getItems(): T[];

    getItem(id: string): T | null;

    clearItems(): boolean;

    fetchItems(): Observable<T[]>;
}