import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminPermissionsGuard implements CanActivate {
  constructor() {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    return true;
  }
}
