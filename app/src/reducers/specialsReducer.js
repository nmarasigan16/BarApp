import { specialsActionTypes as actionTypes } from "../actions/actionTypes";
import {onSpecial} from "../actions/specialsActions";

const initialState = {
    onSpecial: null,
    special: {
        id: 1,
        special_name: 'Rail Card',
        object: {
            'Miller Lite' : [0, 1]
        },
    },
    allSpecials: [

    ]
};

function specialsReducer(state = initialState, action) {
    switch(action.type) {
        case(actionTypes.onSpecial): {
            return Object.assign({}, state, {
                onSpecial: true
            });
        }
        case(actionTypes.offSpecial): {
            return Object.assign({}, state, {
                onSpecial: false
            });
        }
        default:
            return state;
    }
}

export default specialsReducer;
