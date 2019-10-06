import { combineReducers } from 'redux';

import * as accounts from './accounts';
import * as storeList from './stores';
import * as games from './games';
import * as categories from './categories';

export default combineReducers({
  ...accounts,
  ...storeList,
  ...games,
  ...categories,
});
