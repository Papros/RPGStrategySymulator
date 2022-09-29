import { InjectionToken } from "@angular/core";
import { IBackendClient } from "./interfaces";

export const BACKEND_CLIENT_SERVICE = new InjectionToken<IBackendClient>('BACKEND_CLIENT_SERVICE');