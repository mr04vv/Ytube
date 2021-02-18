import { fetchMyInfo } from 'api/users/fetchMyInfo';
import { createActionCreator, createReducer } from 'deox';
import { FetchMeState } from 'entity/reduxState/fetchMeState';
import { Dispatch } from 'redux';
import client from 'utilities/apiClient';

const MODULE_NAME = 'login';
const initialState: FetchMeState = {
  data: {},
  loading: false,
  status: 'notInitialized'
};

// Constants
export const LOGIN_SUCCESS = `redux/${MODULE_NAME}/LOGIN_SUCCESS`;
export const FETCH_SUCCESS = `redux/${MODULE_NAME}/FETCH_SUCCESS`;
export const LOGIN_FAIL = `redux/${MODULE_NAME}/LOGIN_FAIL`;
export const LOGOUT = `redux/${MODULE_NAME}/LOGOUT`;

// Actions
export const loginSuccess = createActionCreator(LOGIN_SUCCESS, (resolve) => (res: object) => resolve(res));
export const fetchSuccess = createActionCreator(FETCH_SUCCESS, (resolve) => (res: object) => resolve(res));
const loginFail = createActionCreator(LOGIN_FAIL);
const logout = createActionCreator(LOGOUT);

// Reducer
const login = createReducer(initialState, (handleAction) => [
  handleAction(loginSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'loggedIn',
  })),
  handleAction(fetchSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'loggedIn',
  })),
  handleAction(loginFail, (state) => ({
    ...state,
    data: {},
    loading: false,
    status: 'notLoggedIn',
  })),
  handleAction(logout, (state) => ({
    ...state,
    data: {},
    loading: false,
    status: 'notLoggedIn',
  })),
]);

export default login;

// GET Data
export const signIn = (firebaseToken: string) => async (dispatch: Dispatch) => {
  const body = {
    fb_custom_token: firebaseToken,
  };
  const res = await client.post('/api/users_for_pc', body).catch((err: string) => {
    dispatch(loginFail());
    throw err;
  });
  dispatch(loginSuccess(res.data.user));
  return res.data.user;
};

// GET Data
export const fetchMe = () => async (dispatch: Dispatch) => {
  const res = await fetchMyInfo().catch((err: string) => {
    dispatch(loginFail());
    throw err;
  });
  dispatch(fetchSuccess(res.user));
  return res.user;
};

export const signOut = () => async (dispatch: Dispatch) => {
  dispatch(logout());
};
