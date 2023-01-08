import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription, pluck, filter } from 'rxjs';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.scss'],
})
export class MainMenuPageComponent implements OnInit, OnDestroy {
  private readonly loggerPrefix = 'MainMenuComponent';

  constructor() {}

  public ngOnDestroy(): void {}

  public ngOnInit(): void {}
}
