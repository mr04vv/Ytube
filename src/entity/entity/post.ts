import { Category } from './category';
import { Game } from './game';
import { User } from './user';

export interface Post {
  id: number;
  title: string;
  videoUrl: string;
  detail: string;
  endTime: number;
  startTime: number;
  user: User;
  game: Game;
  categories: Category[];
  createdAt: string;
  isAnonymous: boolean;
  alreadyLiked: boolean;
  likeCount: number;
  thumbnailUrl: string;
  playCount: number;
}
