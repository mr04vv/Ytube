import { SortType } from 'entity/union/sortType';

interface SearchParamLabel {
  readonly ORDER: 'order';
  readonly PAGE: 'page';
  readonly PER: 'per';
  readonly GAME: 'game';
  readonly CATEGORY: 'category';
  readonly WORD: 'word';
}

export const SearchParams: SearchParamLabel = {
  ORDER: 'order',
  PAGE: 'page',
  PER: 'per',
  GAME: 'game',
  CATEGORY: 'category',
  WORD: 'word',
};

export interface SearchParam {
  order: SortType;
  word: string;
  category: number[];
  game: number[];
  per: number;
  page: number;
}
