import { createActionCreator, createReducer } from 'deox';
import { Dispatch } from 'redux';
import client from 'utilities/apiClient';

const MODULE_NAME = 'POST';
const initialState = {
  data: {},
};

// Constants
export const SEARCH_SUCCESS = `redux/${MODULE_NAME}/SEARCH_POST_SUCCESS`;

// Actions
export const searchSuccess = createActionCreator(SEARCH_SUCCESS, resolve => (res: object) => resolve(res));

// Reducer
const search = createReducer(initialState, handleAction => [
  handleAction(searchSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
]);

export default search;

// GET Data

export const searchPosts = (page: string, per: string, game: number[], category: number[], order: number) => async (dispatch: Dispatch) => {
  const res = await client.get(`/api/search?page=${page}&per=${per}&order=${order}&game=[${game.toString()}]&category=[${category.toString()}]`).catch((err) => {
    throw err;
  });
  dispatch(searchSuccess(res.data));
  return res.data;
};
