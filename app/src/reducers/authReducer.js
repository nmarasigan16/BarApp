import { authActionTypes as actionTypes } from "../actions/actionTypes";

const initialState = {
    token: '',
};

function authReducer(state = initialState, action){
    switch(action.type){
        case actionTypes.authenticate: {
            return Object.assign({}, state, {
                token: action.token
            });
        }
        case actionTypes.setAuthUser: {
            return Object.assign({}, state, {
                authUser: action.username
            });
        }
        case actionTypes.checkToken: {
            return Object.assign({}, state, {
                token: action.token
            });
        }
        case actionTypes.setToken: {
            return Object.assign({}, state, {
                token: action.token
            });
        }
        default: {
            return state;
        }
    }
}

export default authReducer;
