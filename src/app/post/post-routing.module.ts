import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { AddPostComponent } from './add-post/add-post.component';

const routes: Routes = [
  { path: 'view/:id', component: ViewComponent },
  {
    path: 'view-post/:id',
    component: ViewPostComponent,
  },
  {
    path: 'add-post/:id',
    component: AddPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
