import { searchActionTypes as actionTypes } from '../actions/actionTypes';

const initialState = {
    history: [],
};

function searchReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.updateHistory: {
            return Object.assign({}, state, {
                history: action.history
            });
        }
        default: {
            return state;
        }
    }
}

export default searchReducer