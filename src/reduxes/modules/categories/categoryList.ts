import { createActionCreator, createReducer } from 'deox';
import { Dispatch } from 'redux';
import client from 'utilities/apiClient';

const MODULE_NAME = 'FETCH_CATEGORY_LIST';
const initialState = {
  data: {},
};

// Constants
export const FETCH_CATEGORY_LIST_SUCCESS = `redux/${MODULE_NAME}/FETCH_CATEGORY_LIST_SUCCESS`;

// Actions
export const fetchSuccess = createActionCreator(FETCH_CATEGORY_LIST_SUCCESS, resolve => (res: object) => resolve(res));

// Reducer
const categoryList = createReducer(initialState, handleAction => [
  handleAction(fetchSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
]);

export default categoryList;

// GET Data
export const fetchCategories = () => async (dispatch: Dispatch) => {
  const res = await client.get('/api/categories').catch((err) => {
    throw err;
  });
  dispatch(fetchSuccess(res.data));
  return res.data;
};
