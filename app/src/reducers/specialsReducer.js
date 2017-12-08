import { specialsActionTypes as actionTypes } from "../actions/actionTypes";
import {onSpecial} from "../actions/specialsActions";

const initialState = {
    onSpecial: false,
    special: {
        id: 1,
        specialName: 'Rail Card',
        rows: [
            {
                beerName: 'miller_lite',
                amount: 3,
            },
            {
                beerName: 'budweiser',
                amount: 3,
            },
            {
                beerName: 'high_life',
                amount: 3,
            },
            {
                beerName: 'riggs_wheat',
                amount: 1
            },
            {
                beerName: 'sierra_nevada_torpedo',
                amount: 1,
            },
            {
                beerName: 'blue_moon',
                amount: 2,
            },
            {
                beerName: 'coors_light',
                amount: 1,
            },
            {
                beerName: 'angry_orchard',
                amount: 2,
            },
            {
                beerName: '312',
                amount: 1,
            },
            {
                beerName: 'rolling_rock',
                amount: 2,
            },
            {
                beerName: 'guinness',
                amount: 3,
            },
            {
                beerName: 'current_feature',
                amount: 2,
            },
            {
                beerName: 'your_choice',
                amount: 3
            },
            {
                beerName: 'your_choice',
                amount: 0
            },
            {
                beerName: 'your_choice',
                amount: 0
            },
            {
                beerName: 'your_choice',
                amount: 0
            }
            ]
    }
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
