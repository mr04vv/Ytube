import { createActionCreator, createReducer } from 'deox';
import { Dispatch } from 'redux';
import client from 'utilities/apiClient';
import { CreatePostInterface } from 'interfaces/posts/CreatePostInterface';

const MODULE_NAME = 'POST';
const initialState = {
  data: {},
};

// Constants
export const POST_SUCCESS = `redux/${MODULE_NAME}/POST_SUCCESS`;

// Actions
export const createSuccess = createActionCreator(POST_SUCCESS, resolve => (res: object) => resolve(res));

// Reducer
const post = createReducer(initialState, handleAction => [
  handleAction(createSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
]);

export default post;

// GET Data
export const createPost = (body: CreatePostInterface) => async (dispatch: Dispatch) => {
  const res = await client.post('/api/posts', body).catch((err) => {
    throw err;
  });
  dispatch(createSuccess(res.data));
  return res.data;
};
