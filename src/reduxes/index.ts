/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducer from './modules/reducer';
import middlewares from './middlewares';

let store: any = null;

store = createStore(reducer, applyMiddleware(reduxThunk, ...middlewares));

/**
 * @return Redux Store
 */
function configureStore() {
  return store;
}

export default configureStore;
/* eslint-enable */
