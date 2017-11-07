import { apiActionTypes as actionTypes } from '../actions/actionTypes';
import apiActions from '../actions/apiActions';

initialState = {
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
            console.log('you dun f*cked up now');
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
