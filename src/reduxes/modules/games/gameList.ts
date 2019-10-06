import { createActionCreator, createReducer } from 'deox';
import { Dispatch } from 'redux';
import client from 'utilities/apiClient';

const MODULE_NAME = 'FETCH_GAME_LIST';
const initialState = {
  data: {},
};

// Constants
export const FETCH_GAME_LIST_SUCCESS = `redux/${MODULE_NAME}/FETCH_GAME_LIST_SUCCESS`;

// Actions
export const fetchSuccess = createActionCreator(FETCH_GAME_LIST_SUCCESS, resolve => (res: object) => resolve(res));

// Reducer
const gameList = createReducer(initialState, handleAction => [
  handleAction(fetchSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
]);

export default gameList;

// GET Data
export const fetchGames = () => async (dispatch: Dispatch) => {
  const res = await client.get('/api/games').catch((err) => {
    throw err;
  });
  dispatch(fetchSuccess(res.data));
  return res.data;
};
