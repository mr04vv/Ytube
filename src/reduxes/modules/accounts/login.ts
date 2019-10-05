import { createActionCreator, createReducer } from 'deox';

const MODULE_NAME = 'login';
const initialState = {
  data: {},
};

// Constants
export const LOGIN = `redux/${MODULE_NAME}`;
export const LOGIN_SUCCESS = `redux/${MODULE_NAME}/LOGIN_SUCCESS`;
export const LOGIN_FAIL = `redux/${MODULE_NAME}/LOGIN_FAIL`;
export const LOGOUT = `redux/${MODULE_NAME}/LOGOUT`;

// Actions
export const isLoading = createActionCreator(LOGIN);
export const loginSuccess = createActionCreator(LOGIN_SUCCESS, resolve => (res: object) => resolve(res));
export const loginFail = createActionCreator(LOGIN_FAIL, resolve => (err: string) => resolve(err));
export const logout = createActionCreator(LOGOUT);

// Reducer
const login = createReducer(initialState, handleAction => [
  handleAction(isLoading, state => ({
    ...state,
    loading: true,
  })),
  handleAction(loginSuccess, (state, action) => ({
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
