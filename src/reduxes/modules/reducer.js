import { combineReducers } from 'redux';

import * as accounts from './accounts';
import * as storeList from './stores';
import * as games from './games';
import * as categories from './categories';
import * as posts from './posts';
import * as likes from './likes';

export default combineReducers({
  ...accounts,
  ...storeList,
  ...games,
  ...categories,
  ...posts,
  ...likes,
});
