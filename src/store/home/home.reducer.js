import {homeaction} from './homeactiontype';

const getInitialState = () => ({
  isLoad: false,
  marketPlaceList: [],
  homeServiceList: [],
  showCaseList: [],
  user_Info :null
});

export const home = (state = getInitialState(), action) => {
  switch (action.type) {
    //thse for MarketPlace listing
    case homeaction.HOME_MARKET_PLACE_REQUEST:
      return {...state, marketPlaceList: action.payload, isLoad: true};
    case homeaction.HOME_MARKET_PLACE_SUCCESS:
      return {...state, marketPlaceList: action.payload, isLoad: false};
    case homeaction.HOME_MARKET_PLACE_FAILURE:
      return {...state, marketPlaceList: action.payload, isLoad: false};

    //thse for Home Service listing

    case homeaction.HOME_SERIVCE_REQUEST:
      return {...state, homeServiceList: action.payload, isLoad: true};
    case homeaction.HOME_SERVICE_SUCCESS:
      return {...state, homeServiceList: action.payload, isLoad: false};
    case homeaction.HOME_SERVICE_FAILURE:
      return {...state, homeServiceList: action.payload, isLoad: false};

    //thse for Home ShowCase listing

    case homeaction.HOME_SHOWCASE_REQUEST:
      return {...state, showCaseList: action.payload, isLoad: true};
    case homeaction.HOME_SHOWCASE_SUCCESS:
      return {...state, showCaseList: action.payload, isLoad: false};
    case homeaction.HOME_SHOWCASE_FAILURE:
      return {...state, showCaseList: action.payload, isLoad: false};

    //these for User profile info  listing

    case homeaction.USER_IFNO_REQUEST:
      return {...state, user_Info: null, isLoad: true};
    case homeaction.USER_IFNO_SUCCESS:
      return {...state, user_Info: action.payload, isLoad: false};
    case homeaction.USER_IFNO_FAILURE:
      return {...state, user_Info: null, isLoad: false};

    default:
      return state;
  }
};
