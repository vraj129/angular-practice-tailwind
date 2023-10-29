import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ToggleComponent } from '../shared/toggle/toggle.component';

@NgModule({
  declarations: [ListComponent, AddComponent, ToggleComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxSkeletonLoaderModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class UserModule {}
