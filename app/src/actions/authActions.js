import { authActionTypes as actionTypes } from "./actionTypes";
import { makeGetRequest, makePostRequest } from "./apiActions";
import { fetchStarred } from './profileActions';

const CLIENT_ID = '96b9e610674e11455074';

export const authenticate = (response) => {
    return {
        type: actionTypes.authenticate,
        token: response.access_token
    };
};

export const extractUsername = (response) => {
    let login = '';
    if('login' in response){
       login = response.login
    }
    return {
        type: actionTypes.setAuthUser,
        username: login
    };
};

export const getAuthUsername = () => (dispatch, getState) => {
    uri = 'https://api.github.com/user';
    dispatch(makeGetRequest(uri, extractUsername));
};

export const getToken = (code) => (dispatch, getState) => {
    uri = 'https://github.com/login/oauth/access_token';
    params = {
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    };
    dispatch(makePostRequest(uri, authenticate, [getAuthUsername], params))
};

export default authActions = {
    getToken: getToken,
    authenticate: authenticate
}
