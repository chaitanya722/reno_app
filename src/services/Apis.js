export const postAPIWithoutToken = async (params, baseURL, url) => {
  return await fetch(baseURL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: params,
  }).then(response => response.json());
};
export const postAPIWithoutToken_UpdatePassword = async (params, baseURL, url) => {
console.log(baseURL+url , params)

  return await fetch(baseURL + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: params,
  }).then(response => response.json());
};

export const postAPIWithTokenNOParmas = async (baseURL, url, access_token) => {
  return await fetch(baseURL + url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + access_token,
      Accept: 'application/json',
    },
  }).then(response => response.json());
};

//get Api for get product

export const getAPIWithoutToken = async (baseURL, url) => {
  return await fetch(baseURL + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
      'API-Key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
    },
  }).then(response => response.json());
};
//get Api for get product

export const getAPIMemberInfo = async (baseURL, url) => {
  return await fetch(baseURL + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'multipart/form-data',
      'API-Key': '90bd6f5b-033f-42e7-8e92-2a443dfa42f8',
    },
    
  }).then(response => response.json());
};
