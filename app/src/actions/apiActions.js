import {apiActionTypes as actionTypes} from './actionTypes';
import {formatHeaders, makeUrl} from "../lib/url/urlTools";

export const API_ROOT = 'http://127.0.0.1:5000';

//Helper function
function processResponse(response, dataCallback, successCallback=[]) {
    return dispatch => {
        if(response.ok) {
            response.json().then(
                json => {
                    dispatch(fetchItemSuccess());
                    dispatch(dataCallback(json));
                    if (successCallback[0] != null) {
                        successCallback.forEach((callback) => {
                            dispatch(callback());
                        });
                    }
                }
            )
        } else {
            response.json()
                .then(
                    json => {
                        dispatch(fetchItemError(json.message));
                    }
                )
            //TODO add handling of non json errors
        }
    }
}

export const fetchItem = () => (dispatch, getState) => {
    let requests = getState().api.activeRequests;
    requests += 1;
    dispatch({
        type: actionTypes.fetchItem,
        requests
    });
};


export const fetchItemError = (error) => (dispatch, getState) => {
    let requests = getState().api.activeRequests;
    requests -= 1;
    dispatch({
        type: actionTypes.fetchItemFailure,
        requests,
        error
    });
};

export const fetchItemSuccess = () => (dispatch, getState) => {
    let requests = getState().api.activeRequests;
    requests -= 1;
    dispatch({
        type: actionTypes.fetchItemSuccess,
        requests
    });
};

export const makeGetRequest = (uri, dataCallback, successCallback=[], params={}) => (dispatch, getState) => {
    const uriWithParams = makeUrl(uri, params);
    const authState = getState().auth;
    dispatch(fetchItem());
    return fetch(uriWithParams,
        {
            headers: formatHeaders(authState)
        })
        .then(
            response => {dispatch(processResponse(response, dataCallback, successCallback));}
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
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };
    dispatch(fetchItem());
    return fetch(uriWithParams,
        {
            method: 'POST',
            headers: formatHeaders(authState, headers),
            body,
        })
        .then(
            response => {dispatch(processResponse(response, dataCallback, successCallback));}
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
            response => {dispatch(processResponse(response, dataCallback, successCallback));}
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
            response => {dispatch(processResponse(response, dataCallback, successCallback));}
        )
        .catch(
            error => dispatch(fetchItemError(error))
        )
};

export const requests = {
        makeGetRequest,
        makePutRequest,
        makePostRequest,
        makeDeleteRequest,
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
