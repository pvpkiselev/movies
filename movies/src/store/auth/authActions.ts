const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

type LOGIN_TYPE_ACTION = {
  type: typeof LOGIN;
  token: string;
  userId: string;
};

type LOGOUT_TYPE_ACTION = {
  type: typeof LOGOUT;
};

export type AUTH_ACTION = LOGIN_TYPE_ACTION | LOGOUT_TYPE_ACTION;

function login(token: string, userId: string): LOGIN_TYPE_ACTION {
  return {
    type: LOGIN,
    token,
    userId,
  };
}

function logout(): LOGOUT_TYPE_ACTION {
  return {
    type: LOGOUT,
  };
}

export { LOGIN, LOGOUT, login, logout };
