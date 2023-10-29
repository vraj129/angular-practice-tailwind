import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_API, USER_POSTS } from '../shared/url';
import { UserPosts } from './model/res_user_posts';
import { PostComments } from './model/res_post_comments';
import { UserAddComment } from './model/req_post_comment';
import { ReqUserPost } from './model/req_user_post';
import { PostDetail } from './model/res_post_detail';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllUserPosts(id: string): Observable<UserPosts> {
    return this.http.get<UserPosts>(USER_API + '/' + id + '/posts');
  }

  getPostComments(id: string): Observable<PostComments> {
    return this.http.get<PostComments>(USER_POSTS + '/' + id + '/comments');
  }

  getPostDetails(id: string): Observable<PostDetail> {
    return this.http.get<PostDetail>(USER_POSTS + '/' + id);
  }

  addUserPostComment(
    id: string,
    commentModel: UserAddComment
  ): Observable<any> {
    return this.http.post<any>(
      USER_POSTS + '/' + id + '/comments',
      commentModel
    );
  }

  addUserPost(id: string, userPost: ReqUserPost): Observable<any> {
    return this.http.post<any>(USER_API + '/' + id + '/posts', userPost);
  }
}
