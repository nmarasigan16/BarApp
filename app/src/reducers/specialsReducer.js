import { specialsActionTypes as actionTypes } from "../actions/actionTypes";
import {onSpecial} from "../actions/specialsActions";

const initialState = {
    onSpecial: null,
    special: {
        id: 1,
        name: 'Rail Card',
        object: {
            'Miller Lite': [0, 3],
            'Budweiser': [2, 3],
            'High Life': [0, 3],
            'Riggs Wheat': [2, 3],
            'Sierra Nevada Torpedo': [1, 3],
            'Blue Moon': [0, 3],
            'Coors': [3, 3],
            'Angry Orchard': [0, 3],
            '312': [3, 3],
            'Rolling Rock': [1, 3],
            'Guinness': [2, 3],
            'Current Feature': [1, 3],
            'Your Choice': [3, 3],
        },
    },
    allSpecials: [{
            barName: 'Legends',
            description: '$3 for any draft',
            barId: 5
        },
        {
            barName: 'Brothers',
            description: '$1 wells',
            barId: 6
        }]
};

function specialsReducer(state = initialState, action) {
    switch(action.type) {
        case(actionTypes.getSpecialList): {
            return Object.assign({}, state, {
                allSpecials: action.specials
            })
        }
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
