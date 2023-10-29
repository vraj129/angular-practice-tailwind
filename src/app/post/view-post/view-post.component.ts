import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { ComponentUiState, State } from 'src/app/shared/base_component_state';
import { PostService } from '../post.service';
import { PostComments } from '../model/res_post_comments';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAddComment } from '../model/req_post_comment';
import { ToastrService } from 'ngx-toastr';
import { PostDetail } from '../model/res_post_detail';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit, OnDestroy {
  postComments?: PostComments;
  postDetail?: PostDetail;
  postId: string = '';
  isBold: boolean = false;
  viewPostState = new BehaviorSubject<State>(new ViewPostState().loading());

  isDialogOpen: boolean = false;
  feedbackForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    body: ['', [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  initCall(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.postId = id;
        forkJoin([
          this.postService.getPostDetails(id),
          this.postService.getPostComments(id),
        ]).subscribe(
          ([postDetails, postComments]) => {
            this.postComments = postComments;
            this.postDetail = postDetails;
            this.viewPostState.next(new ViewPostState().completed());
          },
          (err) => {
            this.viewPostState.next(new ViewPostState().error());
          }
        );
      } else {
        this.viewPostState.next(new ViewPostState().error());
      }
    });
  }

  ngOnInit(): void {
    this.initCall();
  }
  ngOnDestroy(): void {
    this.viewPostState.unsubscribe();
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  submitForm() {
    if (this.feedbackForm.valid) {
      const formData = this.feedbackForm.value;
      const commentModel: UserAddComment = {
        name: this.feedbackForm.get('name')?.value,
        email: this.feedbackForm.get('email')?.value,
        body: this.feedbackForm.get('body')?.value,
      };

      this.postService.addUserPostComment(this.postId, commentModel).subscribe(
        (val) => {
          this.toastr.success('Comment added succesfully');
          this.initCall();
          this.closeDialog();
          this.feedbackForm.reset();
          return;
        },
        (err) => {
          console.log(err);
          this.toastr.error('Something went wrong');
        }
      );
    } else {
      console.log('Form is incomplete or invalid.');
    }
  }

  toggleBoldness() {
    this.isBold = !this.isBold;
  }
}

class ViewPostState extends ComponentUiState {
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
