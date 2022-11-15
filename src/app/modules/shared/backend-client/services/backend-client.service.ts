import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IBackendClient } from "../interfaces";
import { HttpClient } from '@angular/common/http';
import { IGameDataItem } from "@app/services/storage/interfaces";

@Injectable()
export class BackendClient implements IBackendClient {

    readonly api_url = 'http://localhost:8080';

    constructor(private http: HttpClient) {}

    getRequest<T>(url: string | string[], option: string): Observable<T> {
        let finalUrl = Array.isArray(url) ? url.join('/') : url;
        return this.http.get<T>(`${this.api_url}${finalUrl}/${option}`);
    }

    getAllGameObject<T extends IGameDataItem>(url: string): Observable<T[]> {
        return this.http.get<T[]>(`${this.api_url}${url}`);
    }
    getGameObject<T extends IGameDataItem>(url: string, option: string): Observable<T> {
        return this.http.get<T>(`${this.api_url}${url}/${option}`);
    }
    
}