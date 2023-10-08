import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxSkeletonLoaderModule,
    MatChipsModule,
  ],
})
export class UserModule {}
