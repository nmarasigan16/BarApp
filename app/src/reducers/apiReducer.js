import { apiActionTypes as actionTypes } from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    error: false
};

function apiReducer(state = initialState, action){
    switch(action.type) {
        case actionTypes.fetchProfile: {
            return Object.assign({}, state, {
                isFetching: true
            });
        }
        case actionTypes.fetchProfileError: {
            return Object.assign({}, state, {
                isFetching: false,
                error: true,
            });
        }
        case actionTypes.fetchProfileSuccess: {
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
