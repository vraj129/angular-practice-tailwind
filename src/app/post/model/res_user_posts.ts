export type UserPosts = ResUserPostsModel[];

export interface ResUserPostsModel {
  id: number;
  user_id: number;
  title: string;
  body: string;
}
