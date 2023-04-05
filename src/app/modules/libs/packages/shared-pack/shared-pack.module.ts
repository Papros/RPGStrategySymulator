import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicListComponent, BasicListItemComponent } from './basic-list';
import { SideMenuComponent } from './side-menu';

@NgModule({
  declarations: [SideMenuComponent, BasicListComponent, BasicListItemComponent],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [SideMenuComponent, BasicListComponent, BasicListItemComponent],
})
export class SharedPackModule {}
