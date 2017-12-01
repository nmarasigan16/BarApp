import { authActionTypes as actionTypes } from "./actionTypes";
import { makeGetRequest, makePostRequest, API_ROOT } from "./apiActions";
import { fetchStarred } from './profileActions';


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

export const getToken = (username, password) => (dispatch, getState) => {
    console.log('getting token');
    uri = `${API_ROOT}/login`;
    const body = {
        username,
        password
    };
    dispatch(makePostRequest(uri, authenticate, undefined, undefined, body))
};

export default authActions = {
    getToken,
    authenticate
}
