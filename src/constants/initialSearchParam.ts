import { SortTypes } from 'entity/union/sortType';
import { COUNT_PER_PAGE } from './countPerPage';

export const INITIAL_SEARCH_PARAM = {
  order: SortTypes.NEWEST,
  page: 1,
  per: COUNT_PER_PAGE,
  game: [],
  category: [],
  word: ''
};
