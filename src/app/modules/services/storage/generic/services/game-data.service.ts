import { Inject, Injectable, OnInit } from "@angular/core";
import { ILoggerService, LOGGER_SERVICE } from "@app/shared/logger";
import { Observable } from "rxjs";
import { BACKEND_CLIENT_SERVICE, IBackendClient } from "../../../../shared/backend-client";
import { IGameDataItem } from "../../interfaces/generic/game-data-item.interface";
import { IGameDataService } from "../interfaces/game-data-service.interface";

@Injectable()
export abstract class GameDataService<T extends IGameDataItem> implements IGameDataService<IGameDataItem>, OnInit {

    protected items: T[];
    protected loggerPrefix: string = "GameDataService<T>";

    public constructor(
        @Inject(BACKEND_CLIENT_SERVICE) protected backendClient: IBackendClient, 
        @Inject(LOGGER_SERVICE) protected logger: ILoggerService,
    ){
        this.items = [];
    }

    ngOnInit(): void {
        this.logger.info('constructor()','GameDataService<T>')
    }

    getItems(): T[] {
        return this.items;
    }

    getItem(id: string): T | null {
        let _items = this.items.find((item) => item.id == id);

        return _items ? _items : null;
    }

    clearItems(): boolean {
        this.items = [];
        return true;
    }

    abstract fetchItems(): Observable<T[]>;
    
}