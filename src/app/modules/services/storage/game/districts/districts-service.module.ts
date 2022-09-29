import { ModuleWithProviders, NgModule } from "@angular/core";
import { DISTRICTS_SERVICE } from "./districts-service.module.types";
import { DistrictsService } from "./districts.service";

@NgModule()
export class DistrictsServiceModule {
    public static forRoot(): ModuleWithProviders<DistrictsServiceModule> {
        return {
            ngModule: DistrictsServiceModule,
            providers: [{
                provide: DISTRICTS_SERVICE,
                useClass: DistrictsService,
            }],
        };
    }
}