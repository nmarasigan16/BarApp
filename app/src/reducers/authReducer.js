import { authActionTypes as actionTypes } from "../actions/actionTypes";

const initialState = {
    token: '',
    registered: false,
    user: {
        username: '',
        name: '',
        age: 0,
        gender: 'Male',
        bars: [],
        specials: {},
    }
};

function authReducer(state = initialState, action){
    switch(action.type){
        case actionTypes.setAuthUser: {
            return Object.assign({}, state, {
                authUser: action.user
            });
        }
        case actionTypes.registered: {
            return Object.assign({}, state, {
                registered: true
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
