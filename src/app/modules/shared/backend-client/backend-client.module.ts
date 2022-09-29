import { ModuleWithProviders, NgModule } from "@angular/core";
import { BACKEND_CLIENT_SERVICE } from "./backend-client.module.types";
import { BackendClient } from "./services";

@NgModule()
export class BackendClientModule {
    public static forRoot(): ModuleWithProviders<BackendClientModule> {
        return {
            ngModule: BackendClientModule,
            providers: [{
                provide: BACKEND_CLIENT_SERVICE,
                useClass: BackendClient,
            }],
        };
    }
}