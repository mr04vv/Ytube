import { createActionCreator, createReducer } from 'deox';

const MODULE_NAME = 'storeList';
const initialState = {
  data: [],
};

// Constants
export const GET_STORES = `redux/${MODULE_NAME}`;
export const GET_STORES_SUCCESS = `redux/${MODULE_NAME}/GET_STORES_SUCCESS`;
export const GET_STORES_FAIL = `redux/${MODULE_NAME}/GET_STORES_FAIL`;

// Actions
export const isLoading = createActionCreator(GET_STORES);
export const getStoreListSuccess = createActionCreator(GET_STORES_SUCCESS, resolve => (res: never[]) => resolve(res));
export const getStoreListFail = createActionCreator(GET_STORES_FAIL, resolve => (err: string) => resolve(err));

// Reducer
const storeList = createReducer(initialState, handleAction => [
  handleAction(isLoading, state => ({
    ...state,
    loading: true,
  })),
  handleAction(getStoreListSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
  handleAction(getStoreListFail, state => ({
    ...state,
    loading: false,
    status: 'fail',
  })),
]);

export default storeList;
