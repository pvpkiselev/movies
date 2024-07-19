export type AuthState = {
  isAuth: boolean;
  token: string | null;
  userId: string | null;
};

export type LOGIN_SUCCESS = {
  type: 'login_success';
  token: string;
  userId: string;
};

export type LOGOUT = {
  type: 'logout';
};

export type AuthAction = LOGIN_SUCCESS | LOGOUT;
