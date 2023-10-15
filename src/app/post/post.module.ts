import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { ViewComponent } from './view/view.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ErrorComponent } from '../shared/error/error.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewComponent,
    ErrorComponent,
    ViewPostComponent,
    AddPostComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    NgxSkeletonLoaderModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
})
export class PostModule {}
