import { authActionTypes as actionTypes } from "./actionTypes";
import { makeGetRequest, makePostRequest, API_ROOT } from "./apiActions";
import { storeItem, getItem, keys } from "../lib/storage";
import { fetchStarred } from './profileActions';


export const authenticate = (response) => {
    return {
        type: actionTypes.authenticate,
        token: response.access_token
    };
};

export const setToken = (token) => {
    storeItem(keys.TOKEN, token);
    return {
        type: actionTypes.setToken,
        token
    };
};

export const loadToken = (token) => (dispatch) => {
    const token = getItem(keys.TOKEN);
    if(token) {
        dispatch(setToken(token));
    }
};

export const clearToken = (token) => (dispatch) => {
    // TODO
};

export const processAuthResponse = (response) => (dispatch) => {
    return dispatch(setToken(response.auth_token));
};

export const login = (username, password) => (dispatch) => {
    const uri = `${API_ROOT}/login`;
    const body = {
        username,
        password
    };
    dispatch(makePostRequest(uri, processAuthResponse, undefined, undefined, body))
};

export const registered = () => {
    return {
        type: actionTypes.registered
    }
};

export const register = (username, password, name, gender, age) => (dispatch) => {
    const uri = `${API_ROOT}/register`;
    const body = {
        username,
        password,
        name,
        gender,
        age
    };
    console.log(JSON.stringify(body));
    dispatch(makePostRequest(uri, registered, undefined, undefined, body));
};

export default authActions = {
    login,
    register,
}
