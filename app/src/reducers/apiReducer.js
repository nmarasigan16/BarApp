import { apiActionTypes as actionTypes } from '../actions/actionTypes';

const initialState = {
    activeRequests: false,
    error: ''
};

function apiReducer(state = initialState, action){
    switch(action.type) {
        case actionTypes.fetchItem: {
            return Object.assign({}, state, {
                activeRequests: action.requests,
            });
        }
        case actionTypes.fetchItemFailure: {
            return Object.assign({}, state, {
                activeRequests: action.requests,
                error: action.error,
            });
        }
        case actionTypes.fetchItemSuccess: {
            return Object.assign({}, state, {
                activeRequests: action.requests,
            });
        }
        default: {
            return state;
        }
    }
}

export default apiReducer
