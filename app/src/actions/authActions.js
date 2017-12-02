import { authActionTypes as actionTypes } from "./actionTypes";
import { makeGetRequest, makePostRequest, API_ROOT } from "./apiActions";
import { fetchStarred } from './profileActions';


export const authenticate = (response) => {
    return {
        type: actionTypes.authenticate,
        token: response.access_token
    };
};

export const processAuthResponse = (response) => (dispatch) => {
    return dispatch(setToken(response.token));
};

export const setToken = (response) => {

};

export const login = (username, password) => (dispatch, getState) => {
    uri = `${API_ROOT}/login`;
    const body = {
        username,
        password
    };
    dispatch(makePostRequest(uri, authenticate, undefined, undefined, body))
};

export const register = (username, password, gender, age) => {
    uri = `${API_ROOT}/register`;
    const body = {
        username,
        password,
        gender,
        age
    };
    dispatch(makePostRequest(uri, set))
};

export default authActions = {
    getToken,
    authenticate
}
