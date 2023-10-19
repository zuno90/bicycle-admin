import { LOGIN, LOGOUT } from "../../__types__/auth.type";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  token: null,
};

export const adminReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoading: true };
    case "LOGIN_SUCCESS":
      return { ...state, isLoading: false, accessToken: action.payload.token };
    case "LOGIN_FAILED":
      return {
        ...state,
        isLoading: false,
        accessToken: action.payload.message,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null,
        token: null,
      };
    default:
      return state;
  }
};
