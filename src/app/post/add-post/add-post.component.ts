import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { ReqUserPost } from '../model/req_user_post';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(100),
        Validators.maxLength(500),
      ],
    ],
  });

  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private toastr: ToastrService,
    private location: Location
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.userId = id;
      }
    });
  }

  submitForm() {
    if (this.postForm.valid) {
      const userPost: ReqUserPost = {
        title: this.postForm.get('title')?.value,
        body: this.postForm.get('description')?.value,
      };
      this.postService.addUserPost(this.userId, userPost).subscribe(
        (val) => {
          this.toastr.success('User post added succesfully');
          this.location.back();
        },
        (err) => {
          this.toastr.error('Something went wrong');
        }
      );
    } else {
      console.log('Form is incomplete or invalid.');
    }
  }
}
