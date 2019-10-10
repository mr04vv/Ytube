import { User } from 'interfaces/UserInterface';
import { GameInterface } from 'interfaces/GameInterface';
import { CategoryInterface } from 'interfaces/CategoryInterface';

export interface PostInterface {
  id: number;
  title: string;
  videoUrl: string;
  detail: string;
  endTime: number;
  startTime: number;
  user: User;
  game: GameInterface;
  categories: CategoryInterface[];
  createdAt: string;
  isAnonymous: boolean;
}
