import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./post/post.module').then((mod) => mod.PostModule),
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
