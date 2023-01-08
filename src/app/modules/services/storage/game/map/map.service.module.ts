import { ModuleWithProviders, NgModule } from "@angular/core";
import { MapService } from "./map.service";
import { MAP_SERVICE } from "./map.service.module.types";

@NgModule()
export class MapServiceModule {
    public static forRoot(): ModuleWithProviders<MapServiceModule> {
        return {
            ngModule: MapServiceModule,
            providers: [{
                provide: MAP_SERVICE,
                useClass: MapService,
            }],
        };
    }
}