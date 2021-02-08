import { fetchPostList } from 'api/posts/fetchPostList';
import { createActionCreator, createReducer } from 'deox';
import { FetchPostsState } from 'entity/reduxState/fetchPostsState';
import { Dispatch } from 'redux';

const MODULE_NAME = 'POST';
const initialState: FetchPostsState = {
  data: {},
  loading: false,
  status: 'notInitialized'
};

// Constants
export const FETCH_SUCCESS = `redux/${MODULE_NAME}/FETCH_SUCCESS`;

// Actions
export const fetchSuccess = createActionCreator(FETCH_SUCCESS, resolve => (res: object) => resolve(res));

// Reducer
const fetchPost = createReducer(initialState, handleAction => [
  handleAction(fetchSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
]);

export default fetchPost;

// GET Data

export const getPosts = (page: number, per: number) => async (dispatch: Dispatch) => {
  const res = await fetchPostList(page, per);
  dispatch(fetchSuccess(res));
  return res;
};
