import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { BasicMapPanelComponent, MapCanvasComponent } from "./components";
import { MAP_SERVICE } from "./map-view.module.types";
import { MapService } from "./services";

@NgModule({
  declarations: [
    BasicMapPanelComponent,
    MapCanvasComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BasicMapPanelComponent,
  ],
})

export class MapPanelModule {
  public static forRoot(): ModuleWithProviders<MapPanelModule> {
    return {
      ngModule: MapPanelModule,
      providers: [{
        provide: MAP_SERVICE,
        useClass: MapService,
      }],
    };
  }
}