import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { IBackendClient } from '../interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IGameDataItem } from '@app/services/storage/interfaces';
import { RequestOptions } from 'https';

@Injectable()
export class BackendClient implements IBackendClient {
  readonly api_url = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getRequest<T>(url: string | string[], option: string): Observable<T> {
    let finalUrl = Array.isArray(url) ? url.join('/') : url;
    return this.http
      .get<T>(`${this.api_url}${finalUrl}/${option}`)
      .pipe(catchError(this.handleError));
  }

  postRequest<T>(
    url: string | string[],
    body: object,
    options?: RequestOptions
  ): Observable<T> {
    let finalUrl = Array.isArray(url) ? url.join('/') : url;
    return this.http
      .post<T>(`${this.api_url}${finalUrl}`, body)
      .pipe(catchError(this.handleError));
  }

  getAllGameObject<T extends IGameDataItem>(url: string): Observable<T[]> {
    return this.http
      .get<T[]>(`${this.api_url}${url}`)
      .pipe(catchError(this.handleError));
  }

  getGameObject<T extends IGameDataItem>(
    url: string,
    option: string
  ): Observable<T> {
    return this.http
      .get<T>(`${this.api_url}${url}/${option}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(response: HttpErrorResponse) {
    return throwError(`Error: ${response}`);
  }

  private handleInternalError(response: any) {
    return throwError(response);
  }
}
