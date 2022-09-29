import { ModuleWithProviders, NgModule } from "@angular/core";
import { KINGDOMS_SERVICE } from "./kingdoms-service.module.types";
import { KingdomsService } from "./kingdoms.service";

@NgModule()
export class KingdomsServiceModule {
    public static forRoot(): ModuleWithProviders<KingdomsServiceModule> {
        return {
            ngModule: KingdomsServiceModule,
            providers: [{
                provide: KINGDOMS_SERVICE,
                useClass: KingdomsService,
            }],
        };
    }
}