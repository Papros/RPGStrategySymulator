import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DistrictPanelComponent } from "./components";

@NgModule({
    declarations: [
      DistrictPanelComponent,
    ],
    imports: [
      CommonModule,
    ],
    exports: [
      DistrictPanelComponent,
    ],
  })
  export class DistrictPanelModule {
  }