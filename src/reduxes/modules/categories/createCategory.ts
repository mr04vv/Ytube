import { createActionCreator, createReducer } from 'deox';
import { Dispatch } from 'redux';
import client from 'utilities/apiClient';
import { fetchSuccess } from './categoryList';

const MODULE_NAME = 'CREATE_CATEGORY';
const initialState = {
  data: {},
};

// Constants
export const CREATE_CATEGORY_SUCCESS = `redux/${MODULE_NAME}/CREATE_CATEGORY_SUCCESS`;

// Actions
export const createSuccess = createActionCreator(CREATE_CATEGORY_SUCCESS, (resolve) => (res: object) => resolve(res));

// Reducer
const create = createReducer(initialState, (handleAction) => [
  handleAction(createSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
]);

export default create;

// GET Data
export const createCategory = (name: string) => async (dispatch: Dispatch) => {
  const body = {
    name,
  };
  const res = await client.post('/api/categories', body).catch((err) => {
    throw err;
  });
  dispatch(fetchSuccess(res.data));
  return res.data;
};
