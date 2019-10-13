import { createActionCreator, createReducer } from 'deox';
import { Dispatch } from 'redux';
import client from 'utilities/apiClient';

const MODULE_NAME = 'POST';
const initialState = {
  data: {},
};

// Constants
export const FETCH_SUCCESS = `redux/${MODULE_NAME}/FETCH_LIKED_POST_SUCCESS`;

// Actions
export const fetchSuccess = createActionCreator(FETCH_SUCCESS, resolve => (res: object) => resolve(res));

// Reducer
const likedPost = createReducer(initialState, handleAction => [
  handleAction(fetchSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
]);

export default likedPost;

// GET Data

export const fetchLikedPost = (page: string, per: string) => async (dispatch: Dispatch) => {
  const res = await client.get(`/api/likes?page=${page}&per=${per}`).catch((err) => {
    throw err;
  });
  dispatch(fetchSuccess(res.data));
  return res.data;
};