import { Post } from 'entity/entity/post';

export interface LikePost {
  id: number;
  post: Post;
}

export interface LikePostListResponseDto {
  likes: LikePost[];
}
