import { combineReducers } from 'redux';

import * as accounts from './accounts';
import * as storeList from './stores';
import * as menuList from './menus';

export default combineReducers({
  ...accounts,
  ...storeList,
  ...menuList,
});
