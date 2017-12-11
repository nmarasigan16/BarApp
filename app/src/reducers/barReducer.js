import { barActionTypes as actionTypes } from '../actions/actionTypes';

const initialState = {
    bar: {
        id: 1,
        name: 'Legends',
        location: {
            string_repr: '522 E Green St, Champaign, IL 61820',
            latitude: 40.1105053,
            longitude: -88.2311641,
        },
        phone: '2173557674',
        specials: [
            [{
                    id: 1,
                    description: '$3 drafts.  Includes Legend\'s Lager, Guinness, Blue Moon, Coors Light, Miller Lite, and more!',
                    object: {
                        name: 'Rail Card'
                    }
                },
                {
                    id: 2,
                    description: '$2 Tequila shots'
                }],
            [
                {
                    id: 1,
                    description: '$3 drafts.  Includes Legend\'s Lager, Guinness, Blue Moon, Coors Light, Miller Lite, and more!',
                    object: {
                        name: 'Rail Card'
                    },
                }
            ],
            [],
            [],
            [
                {
                    id: 5,
                    description: '$2.50 Draft Specials'
                },
                {
                    id: 1,
                    description: '$3 drafts.  Includes Legend\'s Lager, Guinness, Blue Moon, Coors Light, Miller Lite, and more!',
                    object: {
                    name: 'Rail Card'
                    }
                },
                {
                    id: 6,
                    description: '$2 Miller, Coors'
                },
                {
                    id: 7,
                    description: '$2 Sweet Tea Vodka'
                }
            ],
            [ {
                    id: 1,
                    description: '$3 drafts.  Includes Legend\'s Lager, Guinness, Blue Moon, Coors Light, Miller Lite, and more!',
                    object: {
                    name: 'Rail Card'
                    }
                },],
            [],
        ],
        cover: 10,
    }
};

function barReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.setBar: {
            return Object.assign({}, state, {
                bar: action.bar,
            });
        }
        case actionTypes.updateCover: {
            return Object.assign({}, state, {
                bar: action.bar,
            });
        }
        case actionTypes.updateSpecial: {
            return Object.assign({}, state, {
              bar: action.bar,
            })
        }
        case actionTypes.createSpecial: {
            return Object.assign({}, sate, {
                bar: action.bar,
            })
        }
        default: {
            return state;
        }
    }
}

export default barReducer;

