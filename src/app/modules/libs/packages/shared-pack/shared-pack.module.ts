import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './side-menu';

@NgModule({
  declarations: [SideMenuComponent],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [SideMenuComponent],
})
export class SharedPackModule {}
