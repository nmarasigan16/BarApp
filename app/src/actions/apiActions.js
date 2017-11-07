import { apiActionTypes as actionTypes } from './actionTypes';


//Helper functions
function makeParam(param, val) {
    return `${param}=${val}`;
}

function formatParams(params) {
    if(Object.keys(params).length === 0){
        return '';
    }
    let keys = Object.keys(params);
    let paramString = '?';
    paramString += makeParam(keys[0], params[keys[0]]);
    keys = keys.slice(1);
    keys.forEach( (param) => {
        paramString += `&${makeParam(param, params[param])}`;
    });
    return paramString;
}

export function makeUrl(url, params={}){
    return url + formatParams(params)
}

function formatHeaders(authState, otherHeaders={}) {
    headers = {};
    if(authState.token){
        headers['Authorization'] = `token ${authState.token}`;
    }
    headers = Object.assign({}, otherHeaders, headers);
    return headers;
}

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
