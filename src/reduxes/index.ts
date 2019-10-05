/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducer from './modules/reducer';


let store: any = null;

store = createStore(reducer, applyMiddleware(reduxThunk));

/**
 * @return Redux Store
 */
function configureStore() {
  return store;
}

export default configureStore;
/* eslint-enable */
