import {apiActionTypes as actionTypes} from './actionTypes';
import {formatHeaders, makeUrl} from "../lib/url/urlTools";

export const API_ROOT = 'http://127.0.0.1:5000';

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
            response => {
                response.json().then(
                json => {
                    dispatch(fetchItemSuccess());
                    dispatch(dataCallback(json));
                    if(successCallback[0] != null) {
                        successCallback.forEach((callback) => {
                            dispatch(callback());
                        });
                    }
                })
            }
        )
        .catch(
            error => {
                dispatch(fetchItemError(error));
            }
        );

};

export const makePostRequest = (uri, dataCallback, successCallback=[], params={}, body={}) => (dispatch, getState) => {
    const uriWithParams = makeUrl(uri, params);
    const authState = getState().auth;
    body = JSON.stringify(body);
    let headers = {
        'Accept': 'application/json'
    };
    dispatch(fetchItem());
    console.log(`making post request to ${uriWithParams} with body ${body}`);
    return fetch(uriWithParams,
        {
            method: 'POST',
            headers: formatHeaders(authState, headers),
            body,
        })
        .then(
            response => {
                console.log(response);
                response.json().then(
                json => {
                    dispatch(fetchItemSuccess());
                    dispatch(dataCallback(json));
                    if(successCallback[0] != null) {
                        successCallback.forEach((callback) => {
                            dispatch(callback());
                        });
                    }
                })
            }
        )
        .catch(
            error => dispatch(fetchItemError(error))
        )
};

export const makePutRequest = (uri, dataCallback, successCallback=[], params={}, body={}) => (dispatch, getState) => {
    const uriWithParams = makeUrl(uri, params);
    const authState = getState().auth;
    body = JSON.stringify(body);
    const putHeaders = {
        'Content-Length': 0
    };
    dispatch(fetchItem());
    return fetch(uriWithParams,
        {
            method: 'PUT',
            headers: formatHeaders(authState, putHeaders),
            body
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
            error => dispatch(fetchItemError(error))
        )
};

export default apiActionCreators = Object.assign({}, {
    fetchItem,
    fetchItemError,
    fetchItemSuccess,
    makeGetRequest,
    makePutRequest,
    makePostRequest,
    makeDeleteRequest,
});
