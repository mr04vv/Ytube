import { createActionCreator, createReducer } from 'deox';
import { Dispatch } from 'redux';
import client from 'utilities/apiClient';

const MODULE_NAME = 'login';
const initialState = {
  data: {},
};

// Constants
export const LOGIN_SUCCESS = `redux/${MODULE_NAME}/LOGIN_SUCCESS`;
export const FETCH_SUCCESS = `redux/${MODULE_NAME}/FETCH_SUCCESS`;
export const LOGIN_FAIL = `redux/${MODULE_NAME}/LOGIN_FAIL`;
export const LOGOUT = `redux/${MODULE_NAME}/LOGOUT`;

// Actions
export const loginSuccess = createActionCreator(LOGIN_SUCCESS, resolve => (res: object) => resolve(res));
export const fetchSuccess = createActionCreator(FETCH_SUCCESS, resolve => (res: object) => resolve(res));
const loginFail = createActionCreator(LOGIN_FAIL, resolve => (err: string) => resolve(err));
const logout = createActionCreator(LOGOUT);

// Reducer
const login = createReducer(initialState, handleAction => [
  handleAction(loginSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
  handleAction(fetchSuccess, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'success',
  })),
  handleAction(loginFail, (state, action) => ({
    ...state,
    data: action.payload,
    loading: false,
    status: 'fail',
  })),
  handleAction(logout, state => ({
    ...state,
    data: {},
    loading: false,
    status: 'logout',
  })),
]);

export default login;

// GET Data
export const signIn = (firebaseToken: string) => async (dispatch: Dispatch) => {
  const body = {
    fb_custom_token: firebaseToken,
  };
  const res = await client.post('/api/users_for_pc', body).catch((err: string) => {
    dispatch(loginFail(err));
    throw err;
  });
  dispatch(loginSuccess(res.data.user));
  return res.data.user;
};

// GET Data
export const fetchMe = () => async (dispatch: Dispatch) => {
  const res = await client.get('/api/me').catch((err: string) => {
    dispatch(loginFail(err));
    throw err;
  });
  dispatch(fetchSuccess(res.data.user));
  return res.data.user;
};

export const signOut = () => async (dispatch: Dispatch) => {
  dispatch(logout());
};
