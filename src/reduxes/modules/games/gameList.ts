import { fetchGameList } from 'api/games/fetchGameList';
import { createActionCreator, createReducer } from 'deox';
import { FetchGamesState } from 'entity/reduxState/fetchGamesState';
import { Dispatch } from 'redux';

const MODULE_NAME = 'FETCH_GAME_LIST';
const initialState: FetchGamesState = {
  data: {},
  loading: false,
  status: 'notInitialized'
};

// Constants
export const FETCH_GAME_LIST_SUCCESS = `redux/${MODULE_NAME}/FETCH_GAME_LIST_SUCCESS`;

// Actions
export const fetchSuccess = createActionCreator(FETCH_GAME_LIST_SUCCESS, (resolve) => (res: object) => resolve(res));

// Reducer
const gameList = createReducer(initialState, (handleAction) => [
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
  const res = await fetchGameList().catch((err) => {
    throw err;
  });
  dispatch(fetchSuccess(res));
  return res;
};
