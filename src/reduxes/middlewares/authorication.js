import client from 'utilities/apiClient';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from 'reduxes/modules/accounts/login';

export function setAuthenticationRequestHeader(
  localKey = localStorage.getItem('localKey'),
) {
  const data = ['Bearer'];

  if (localKey) {
    data.push(localKey);
  }
  client.defaults.headers.common.Authorization = data.join(' ');
}
setAuthenticationRequestHeader();

// 認証周り
const authenticationMiddleware = () => (next) => (action) => {
  // ログイン時
  if (action.type === LOGIN_SUCCESS) {
    setAuthenticationRequestHeader(
      action.payload.token,
    );
    localStorage.setItem('localKey', action.payload.token);
  } else if (action.type === LOGIN_FAIL) {
    client.defaults.headers.common.Authorization = null;
  } else if (action.type === LOGOUT) {
    client.defaults.headers.common.Authorization = null;
    localStorage.removeItem('localKey');
  }

  return next(action);
};

export default authenticationMiddleware;
