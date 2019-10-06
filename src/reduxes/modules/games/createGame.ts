import { createActionCreator, createReducer } from 'deox';
import { Dispatch } from 'redux';
import client from 'utilities/apiClient';
import { fetchSuccess } from './gameList';

const MODULE_NAME = 'CREATE_GAME';
const initialState = {
  data: {},
};

// Constants
export const CREATE_GAME_SUCCESS = `redux/${MODULE_NAME}/CREATE_GAME_SUCCESS`;

// Actions
export const createSuccess = createActionCreator(CREATE_GAME_SUCCESS, resolve => (res: object) => resolve(res));

// Reducer
const create = createReducer(initialState, handleAction => [
  handleAction(createSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
]);

export default create;

// GET Data
export const createGame = (title: string) => async (dispatch: Dispatch) => {
  const body = {
    title,
  };
  const res = await client.post('/api/games', body).catch((err) => {
    throw err;
  });
  dispatch(fetchSuccess(res.data));
  return res.data;
};
