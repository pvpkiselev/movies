// import { AUTH_ACTION, LOGIN, LOGOUT } from './authActions';

// type AuthState = {
//   isAuth: boolean;
//   email: string | null;
//   token: string | null;
//   userId: string | null;
// };

// const authInitialState: AuthState = {
//   isAuth: false,
//   email: null,
//   token: null,
//   userId: null,
// };

// export function authReducer(authState: AuthState = authInitialState, action: AUTH_ACTION) {
//   switch (action.type) {
//     case LOGIN: {
//       return {
//         ...authState,
//         token: action.token,
//         userId: action.userId,
//         isAuth: true,
//       };
//     }
//     case LOGOUT: {
//       return {
//         ...authState,
//         email: null,
//         token: null,
//         userId: null,
//         isAuth: false,
//       };
//     }
//     default: {
//       return authState;
//     }
//   }
// }
