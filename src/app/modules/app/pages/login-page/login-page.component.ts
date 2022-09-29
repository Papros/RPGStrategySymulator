import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ILoggerService, LOGGER_SERVICE } from '@app/shared/logger';
import { AppRoutes } from '../../enums';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private readonly loggerPrefix = 'LoginPageComponent';
  private background_imageURL: string;
  public selectedUserType: string | null;

  constructor(
    private readonly ref: ChangeDetectorRef,
    private readonly router: Router,
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
  ){
    this.background_imageURL = "tavern_background.jpg";
    this.selectedUserType = null;
  }

  public openLogin(userType: string): void {
    this.selectedUserType = userType;
    this.logger.info(`Selected login as: ${userType}`, this.loggerPrefix);
    this.ref.markForCheck();
  }

  public closeLogin(): void {
    this.selectedUserType = null;
    this.logger.info(`Back for selection of login type`, this.loggerPrefix);
    this.ref.markForCheck();
  }

  public login():void {
    switch(this.selectedUserType) {
        case "player": this.router.navigate([AppRoutes.UserPanel]); break;
        case "admin": this.router.navigate([AppRoutes.GameMastePanel]); break;
        default: this.router.navigate([AppRoutes.Login]);
    }

  }

  public ngOnDestroy(): void {
  }

  public ngOnInit(): void {
  }

  public getBackgroundStyles(): SafeStyle {
    return {
        'background-image': `url(assets/images/${this.background_imageURL})`,
    };
  }
}