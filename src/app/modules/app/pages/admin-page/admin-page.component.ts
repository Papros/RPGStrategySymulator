import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class AdminPageComponent implements OnInit, OnDestroy {

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
    
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

  }