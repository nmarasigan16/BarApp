import { profileActionTypes as actionTypes } from '../actions/actionTypes';
import { fetchProfile } from '../actions/apiActions';

const initialState = {
    username: 'nmarasigan16',
    profile: {
        name: '',
        followers: 0,
        following: 0,
        public_repos: 0,
        avatar_url: '',
        website: '',
        email: '',
        bio: '',
        login: ''
    },
    repos: [
        {
            name: '',
            description: '',
            owner: {
                login: ''
            },
            id: 1
        },
    ],
};

function cachedProfile(state) {
    return false;
}

function profileReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.getProfile: {
            return Object.assign({}, state, {
                profile: action.profile
            });
        }
        case actionTypes.getRepos: {
            return Object.assign({}, state, {
                repos: action.repos
            });
        }
        default: {
            return state;
        }
    }
}

export default profileReducer
