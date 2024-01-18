import { authActions, homeActions } from '../actionTypes';

const getInitialState = () => ({
  isLoading: false,
  token: null,
  User_mid: null,
  emailVerification: {
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
});

export const auth = (state = getInitialState(), action) => {
  switch (action.type) {
    // User signup user
    case authActions.AUTH_SIGNUP_REQUEST:
      return { ...state, User_mid: null, token: null, isLoading: true };

    case authActions.AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        User_mid: action.User_mid,
        token: null,
        isLoading: false,
        emailVerification: {
          ...state.emailVerification,
          isLoading: true,
          isSuccess: false,
          isError: false,
        },
      };

    case authActions.AUTH_SIGNUP_FAILURE:
      return {
        ...state,
        User_mid: null,
        token: null,
        isLoading: false,
        emailVerification: {
          ...state.emailVerification,
          isLoading: false,
          isSuccess: false,
          isError: false,
        },
      };

    // Email Verification reducer
    case authActions.EMAIL_VERIFICATION_REQUEST:
      return {
        ...state,
        emailVerification: {
          ...state.emailVerification,
          isLoading: true,
          isSuccess: false,
          isError: false,
        },
      };

    case authActions.EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        emailVerification: {
          ...state.emailVerification,
          isLoading: false,
          isSuccess: true,
          isError: false,
        },
      };

    case authActions.EMAIL_VERIFICATION_FAILURE:
      return {
        ...state,
        emailVerification: {
          ...state.emailVerification,
          isLoading: false,
          isSuccess: false,
          isError: true,
        },
      };


    //User Login reducer

    case authActions.AUTH_LOGIN_REQUEST:
      return {...state, User_mid: null, token: null, isLoading: true};
    case authActions.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        User_mid: action.User_mid,
        token: action.token,
        isLoading: false,
      };
    case authActions.AUTH_LOGIN_FAILURE:
      return {...state, User_mid: null, token: null, isLoading: false};

    //User Logout reducer

    case authActions.AUTH_LOGOUT_REQUEST:
      return {...state, User_mid: null, token: null, isLoading: true};
    case authActions.AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        User_mid: null,
        token: null,
        isLoading: false,
      };
    case authActions.AUTH_LOGOUT_FAILURE:
      return {...state, User_mid: null, token: null, isLoading: false};

    default:
      return state;
  }
};
