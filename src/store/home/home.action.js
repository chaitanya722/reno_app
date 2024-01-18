import {homeaction} from './homeactiontype';
import {
  MARKET_PLACE_LIST,
  SHOECASELIST,
  HOME_SERVICE_LIST,
  GET_PROFILE_INFO,
} from '../../services/ApiUrls';
import {get_member_info, get_product_list} from '../../services/getApi';
import {Alert} from 'react-native';
import {Request_params} from '../../services/postApi';
import { getAPIMemberInfo } from '../../services/Apis';

export const _doMarketPlace = () => {
  return dispatch => {
    dispatch({type: homeaction.HOME_MARKET_PLACE_REQUEST});

    get_product_list(MARKET_PLACE_LIST)
      .then(result => {
        if (result?.success) {
          dispatch({
            type: homeaction.HOME_MARKET_PLACE_SUCCESS,
            payload: result?.data,
          });
        } else {
          Alert.alert(result?.msg);
          dispatch({type: homeaction.HOME_MARKET_PLACE_FAILURE});
        }
      })
      .catch(error => {
        console.log(error.message, 'error');
        dispatch({type: homeaction.HOME_MARKET_PLACE_FAILURE});
      });
  };
};
export const _doHomeService = () => {
  return dispatch => {
    dispatch({type: homeaction.HOME_SERIVCE_REQUEST});

    get_product_list(HOME_SERVICE_LIST)
      .then(result => {
        if (result?.success) {
          dispatch({
            type: homeaction.HOME_SERVICE_SUCCESS,
            payload: result?.products,
          });
        } else {
          Alert.alert(result?.msg);
          dispatch({type: homeaction.HOME_SERVICE_FAILURE});
        }
      })
      .catch(error => {
        console.log(error.message, 'error');
        dispatch({type: homeaction.HOME_SERVICE_FAILURE});
      });
  };
};
export const _doShowCase = () => {
  return dispatch => {
    dispatch({type: homeaction.HOME_SERIVCE_REQUEST});

    get_product_list(SHOECASELIST)
      .then(result => {
        if (result?.success) {
          dispatch({
            type: homeaction.HOME_SHOWCASE_SUCCESS,
            payload: result?.projects,
          });
        } else {
          Alert.alert(result?.msg);
          dispatch({type: homeaction.HOME_SHOWCASE_FAILURE});
        }
      })
      .catch(error => {
        console.log(error.message, 'error');
        dispatch({type: homeaction.HOME_SHOWCASE_FAILURE});
      });
  };
};
export const _doGetUserInfo = params => {
  console.log('375894758392', params);
  return dispatch => {
    dispatch({type: homeaction.USER_IFNO_REQUEST});

    get_member_info(`${GET_PROFILE_INFO}?mid=${params}`)
      .then(result => {
        if (result?.success) {
          console.log(result?.member, 56789054364576);
          dispatch({
            type: homeaction.USER_IFNO_SUCCESS,
            payload: result?.member,
          });
        } else {
          Alert.alert(result?.msg);
          console.log(result, 5674364576);

          dispatch({type: homeaction.USER_IFNO_FAILURE});
        }
      })
      .catch(error => {
        console.log(error.message, 'error');
        console.log(error, 56743642332576);

        dispatch({type: homeaction.USER_IFNO_FAILURE});
      });
  };
};
