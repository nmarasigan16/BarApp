import { apiActionTypes as actionTypes } from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    error: ''
};

function apiReducer(state = initialState, action){
    switch(action.type) {
        case actionTypes.fetchItem: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case actionTypes.fetchItemFailure: {
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error,
            });
        }
        case actionTypes.fetchItemSuccess: {
            return Object.assign({}, state, {
                isFetching: false
            });
        }
        default: {
            return state;
        }
    }
};

export default apiReducer
