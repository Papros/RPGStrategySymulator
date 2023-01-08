import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SidePanelComponent } from "./components";

@NgModule({
    declarations: [
        SidePanelComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        SidePanelComponent,
    ],
  })
  export class SidePanelModule {
  }