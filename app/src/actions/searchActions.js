import { searchActionTypes as actionTypes } from './actionTypes';
import { makeGetRequest, makePutRequest, makeDeleteRequest, checkStatus } from "./apiActions";
import { storeItem } from '../lib/storage';

const API_ROOT = 'https://api.github.com';

export const updateHistory = (history) => {
    return {
        type: actionTypes.updateHistory,
        history
    }
};

export const addToHistory = (query) => (dispatch, getState) => {
    let history = getState().search.history;
    history.push(query);
    dispatch(updateHistory(history));
};

export const search = (query, type, sort, order) => (dispatch, getState) => {
    const params = {
        q: query,
    };
    if(sort){
        params['sort'] = sort;
    }
    if(order){
        params['order'] = order;
    }

    const uri = API_ROOT + `/${type}`;
    dispatch(makeGetRequest(uri, params))
};