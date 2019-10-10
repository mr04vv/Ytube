import { createActionCreator, createReducer } from 'deox';
import { Dispatch } from 'redux';
import client from 'utilities/apiClient';

const MODULE_NAME = 'DELETE';
const initialState = {
  data: {},
};

// Constants
export const DELETE_SUCCESS = `redux/${MODULE_NAME}/DELETE_SUCCESS`;

// Actions
export const deleteSuccess = createActionCreator(DELETE_SUCCESS, resolve => (res: object) => resolve(res));

// Reducer
const deletePost = createReducer(initialState, handleAction => [
  handleAction(deleteSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
]);

export default deletePost;

// GET Data
export const deleteById = (id: number) => async (dispatch: Dispatch) => {
  const res = await client.delete(`/api/posts/${id}`).catch((err) => {
    throw err;
  });
  dispatch(deleteSuccess(res.data));
  return res.data;
};
