import {BASE_URL} from './environment';
import {getAPIMemberInfo, getAPIWithoutToken} from './Apis';

export const get_product_list = async url => {
  const response = await getAPIWithoutToken(BASE_URL, url);
  return response;
};
export const get_member_info = async url => {
  const response = await getAPIMemberInfo(BASE_URL, url);
  return response;
};
