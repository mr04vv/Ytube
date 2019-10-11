import { createActionCreator, createReducer } from 'deox';
import { Dispatch } from 'redux';
import client from 'utilities/apiClient';

const MODULE_NAME = 'LIKE';
const initialState = {
  data: {},
};

// Constants
export const LIKE_SUCCESS = `redux/${MODULE_NAME}/LIKE_SUCCESS`;

// Actions
export const createSuccess = createActionCreator(LIKE_SUCCESS, resolve => (res: object) => resolve(res));
export const deleteSuccess = createActionCreator(LIKE_SUCCESS, resolve => (res: object) => resolve(res));

// Reducer
const like = createReducer(initialState, handleAction => [
  handleAction(createSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
  handleAction(deleteSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
]);

export default like;

// GET Data
export const createLike = (postId: number) => async (dispatch: Dispatch) => {
  const body = {
    post_id: postId,
  };
  const res = await client.post('/api/likes', body).catch((err) => {
    throw err;
  });
  dispatch(createSuccess(res.data));
  return res.data;
};

export const deleteLike = (postId: number) => async (dispatch: Dispatch) => {
  const res = await client.delete(`/api/likes/${postId}`).catch((err) => {
    throw err;
  });
  dispatch(deleteSuccess(res.data));
  return res.data;
};
