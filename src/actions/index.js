import * as types from './actiontypes';

/*
   1) above "IOS_MEMBERSHIP_URL" is written for redirecting the user to web membership page.
   2) This is only for IOS
   3) We have two different url's for dev and production. please change the url's according to the build environment.
        PRODUCTION URL = https://account.pepelwerk.com
        DEV URL = https://dev-account.pepelwerk.com
*/

/*
Action Creators
*/

export function changeAppRoot (root) {
  return {
    type: types.ROOT_CHANGED,
    root: root
  };
}

/*
dispatch the actionCreators
*/

export function appInitialized () {
  return async function (dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch(changeAppRoot('InitialPageState'));
  };
}

export function loginHome () {
  return async function (dispatch, getState) {
    dispatch(changeAppRoot('after-login'));
  };
}
