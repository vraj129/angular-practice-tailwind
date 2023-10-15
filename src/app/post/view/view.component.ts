import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentUiState, State } from 'src/app/shared/base_component_state';
import { PostService } from '../post.service';
import { UserPosts } from '../model/res_user_posts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit, OnDestroy {
  viewState = new BehaviorSubject<State>(new ViewState().loading());
  userPosts?: UserPosts;
  userId: string = '';

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.viewState.next(new ViewState().loading());
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
        this.postService.getAllUserPosts(id).subscribe(
          (val) => {
            this.userPosts = val;
            this.viewState.next(new ViewState().completed());
          },
          (err) => {
            console.log(err);
            this.viewState.next(new ViewState().error());
          }
        );
      } else {
        this.viewState.next(new ViewState().error());
      }
    });
  }

  ngOnDestroy(): void {
    this.viewState.unsubscribe();
  }
}

class ViewState extends ComponentUiState {
  override loading(): State {
    return super.loading();
  }
  override completed(): State {
    return super.completed();
  }
  override error(): State {
    return super.error();
  }
}
