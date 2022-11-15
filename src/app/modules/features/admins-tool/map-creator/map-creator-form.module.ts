import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MapCreatorFormComponent } from "./components";

@NgModule({
    declarations: [
        MapCreatorFormComponent,
    ],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
    ],
    exports: [
        MapCreatorFormComponent,
    ],
  })
  export class MapCreatorFormModule {
  }