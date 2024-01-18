import {BASE_URL, BASE_URL_OnBoard} from './environment';
import {
  postAPIWithToken,
  postAPIWithoutToken,
  postAPIWithTokenNOParmas,
  postAPIWithTokenFormData,
  postAPIWithTokenFormDataMulitpart,
  postAPIWithoutToken_UpdatePassword,
} from './Apis';

export const Request_params = async (url, params) => {
  const response = await postAPIWithoutToken(params, BASE_URL_OnBoard, url);
  return response;
};
export const Request_UpdatePassword = async (url, params) => {
  const response = await postAPIWithoutToken_UpdatePassword(params, BASE_URL_OnBoard, url);
  return response;
};


export const Request_logout = async (url, access_token) => {
  const response = await postAPIWithTokenNOParmas( BASE_URL, url,access_token);
  return response;
};



