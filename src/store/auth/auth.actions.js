import {authActions} from '../actionTypes';
import { Request_params} from '../../services/postApi';
import {
  FORGOT_PASSWORD,
  LOGIN,
  SIGN_UP,
} from '../../services/ApiUrls';

import {Alert} from 'react-native';

export const _dologin = params => {
  return dispatch => {
    dispatch({type: authActions.AUTH_LOGIN_REQUEST});
    console.log('login params', params);
    Request_params(LOGIN, params)
      .then(result => {
        console.log('login result', result);
        if (result?.success) {
          dispatch({
            type: authActions.AUTH_LOGIN_SUCCESS,
            User_mid: result?.mid,
            token: result?.jwt,
          });
        } else {
          Alert.alert(result?.msg);
          dispatch({type: authActions.AUTH_LOGIN_FAILURE});
        }
      })
      .catch(error => {
        console.log(error.message, 'error');
        dispatch({type: authActions.AUTH_LOGIN_FAILURE});
      });
  };
};

// _dosignup action
export const _dosignup = params => {
  return dispatch => {
    dispatch({type: authActions.AUTH_SIGNUP_REQUEST});

    Request_params(SIGN_UP, params)
      .then(result => {
        console.log(result, 'hfhe');

        if (result.success) {
          // Dispatch action for successful registration
          dispatch({
            type: authActions.AUTH_SIGNUP_SUCCESS,
            User_mid: result.mid,
            token: null,
          });

          // Initiate the email verification process
          dispatch(_doEmailVerification(result.mid));
        } else {
          Alert.alert(result.msg);
          dispatch({type: authActions.AUTH_SIGNUP_FAILURE});
        }
      })
      .catch(error => {
        console.log(error.message, 'error 343');
        dispatch({type: authActions.AUTH_SIGNUP_FAILURE});
      });
  };
};

// _doEmailVerification action
export const _doEmailVerification = mid => {
  return dispatch => {
    // Dispatch action to indicate the start of email verification
    dispatch({type: authActions.EMAIL_VERIFICATION_REQUEST});

    // Construct the URL with the generated mid
    const verificationUrl = `http://139.59.236.50:5552/verify_member_client?mid=${mid}`;

    // Make the email verification API call
    fetch(verificationUrl)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          // Dispatch action for successful email verification
          dispatch({type: authActions.EMAIL_VERIFICATION_SUCCESS});
        } else {
          Alert.alert(result.msg);
          dispatch({type: authActions.EMAIL_VERIFICATION_FAILURE});
        }
      })
      .catch(error => {
        console.log(error.message, 'error during email verification');
        dispatch({type: authActions.EMAIL_VERIFICATION_FAILURE});
      });
  };
};


export const _doforgotPassword = (data, callbackObj) => {
  return dispatch => {
    dispatch({type: authActions.AUTH_FORGOT_PASS_REQUEST});

    Request_params(FORGOT_PASSWORD, data)
      .then(result => {
        console.log(result);
        dispatch({
          type: authActions.AUTH_FORGOT_PASS_SUCCESS,
          payload: result.data,
        });
        // Call the callback function with the data and its parameters
        {
          result.status == 200
            ? callbackObj.callback(result)
            : showSnackError(result.message);

          console.log('success', result.message);
        }
      })
      .catch(error => {
        console.log(error.message, 'error');
        //  showSnackError('Something went wrong');
        Alert.alert('Something went wrong ');
        dispatch({type: authActions.AUTH__FORGOT_PASS_FAILURE});
      });
  };
};

export const _doLogout = params => {
  return dispatch => {
    dispatch({type: authActions.AUTH_LOGOUT_REQUEST});
    dispatch({
      type: authActions.AUTH_LOGOUT_SUCCESS,
      payload: params,
    });


  };
};
