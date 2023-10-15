export type PostComments = ResPostComments[];

export interface ResPostComments {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}
