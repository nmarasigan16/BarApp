import {apiActionTypes as actionTypes} from './actionTypes';
import {formatHeaders, makeUrl} from "../lib/url/urlTools";

export const API_ROOT = '';
export const FACEBOOK_API_ROOT = '';

//Helper functions

export const fetchItem = () => ({
        type: actionTypes.fetchItem,
});

export const fetchItemError = (error) => ({
        type: actionTypes.fetchItemFailure,
        error: error
});

export const fetchItemSuccess = () => ({
        type: actionTypes.fetchItemSuccess,
});

export const makeGetRequest = (uri, dataCallback, successCallback=[], params={}) => (dispatch, getState) => {
    const uriWithParams = makeUrl(uri, params);
    const authState = getState().auth;
    dispatch(fetchItem());
    return fetch(uriWithParams,
        {
            headers: formatHeaders(authState)
        })
            .then(
                response => response.json()
            )
            .then(
                json => {
                    dispatch(fetchItemSuccess());
                    dispatch(dataCallback(json));
                    if(successCallback[0] != null) {
                        successCallback.forEach((callback) => {
                            dispatch(callback());
                        });
                    }
                }
            )
            .catch(
                error => {
                    console.log(uri);
                    dispatch(fetchItemError(error));
                }
            );
};

export const makePostRequest = (uri, dataCallback, successCallback=[], params={}) => (dispatch, getState) => {
    const uriWithParams = makeUrl(uri, params);
    const authState = getState().auth;
    let headers = {
        'Accept': 'application/json'
    };
    dispatch(fetchItem());
    return fetch(uriWithParams,
        {
            method: 'POST',
            headers: formatHeaders(authState, headers)
        })
        .then(
            response => response.json()
        ).then(
            json => {
                dispatch(fetchItemSuccess());
                dispatch(dataCallback(json));
                if(successCallback[0] != null) {
                    successCallback.forEach((callback) => {
                        dispatch(callback());
                    });
                }
            }
        )
        .catch(
            error => console.log(error)
        )
};

export const makePutRequest = (uri, dataCallback, successCallback=[], params={}) => (dispatch, getState) => {
    const uriWithParams = makeUrl(uri, params);
    const authState = getState().auth;
    const putHeaders = {
        'Content-Length': 0
    };
    dispatch(fetchItem());
    return fetch(uriWithParams,
        {
            method: 'PUT',
            headers: formatHeaders(authState, putHeaders)
        })
        .then(
            response => {
                dispatch(fetchItemSuccess());
                dispatch(dataCallback(response));
                if(successCallback[0] != null) {
                    successCallback.forEach((callback) => {
                        dispatch(callback());
                    });
                }
            }
        )
        .catch(
            error => dispatch(fetchItemError(error))
        )
};

export const makeDeleteRequest = (uri, dataCallback, successCallback=[], params={}) => (dispatch, getState) => {
    const uriWithParams = makeUrl(uri, params);
    const authState = getState().auth;
    const putHeaders = {
        'Content-Length': 0
    };
    dispatch(fetchItem());
    return fetch(uriWithParams,
        {
            method: 'DELETE',
            headers: formatHeaders(authState, putHeaders)
        })
        .then(
            response => {
                dispatch(fetchItemSuccess());
                dispatch(dataCallback(response));
                if(successCallback[0] != null) {
                    successCallback.forEach((callback) => {
                        dispatch(callback());
                    });
                }
            }
        )
        .catch(
            error => console.log(error)
        )
};

export const checkStatus = (uri, dataCallback, successCallback=[], params={}) => (dispatch, getState) => {
    const uriWithParams = makeUrl(uri, params);
    const authState = getState().auth;
    dispatch(fetchItem());
    return fetch(uriWithParams,
        {
            headers: formatHeaders(authState)
        })
        .then(
            response => {
                dispatch(fetchItemSuccess());
                dispatch(dataCallback(response));
                if (successCallback[0] != null) {
                    successCallback.forEach((callback) => {
                        dispatch(callback());
                    });
                }
            }
        )
        .catch(
            error => console.log(error)
        )
};

export default apiActionCreators = Object.assign({}, {
    fetchItem,
    fetchItemError,
    fetchItemSuccess
});
