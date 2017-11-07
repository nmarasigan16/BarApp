import { profileActionTypes as actionTypes } from '../actions/actionTypes';

const initialState = {
    username: 'keshavsaharia',
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
    followStatus: 1,
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
    followers: [
        {
            name: '',
            avatar_url: '',
            id: 1,
        },
    ],
    following: [
        {
            name: '',
            avatar_url: '',
            id: -10,
        },
    ],
    starredRepos: [
        {
            name: '',
            description: '',
            owner: {
                login: ''
            },
            id: 1
        }
    ]
};

function profileReducer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.getProfile: {
            return Object.assign({}, state, {
                profile: action.profile
            });
        }
        case actionTypes.setStarredRepos: {
            return Object.assign({}, state, {
                starredRepos: action.repos
            });
        }
        case actionTypes.setRepos: {
            return Object.assign({}, state, {
                repos: action.repos
            });
        }
        case actionTypes.resetFollowers: {
            return Object.assign({}, state, {
                followers: initialState.followers
            });
        }
        case actionTypes.addToFollowers: {
            return Object.assign({}, state, {
               followers: action.followers
            });
        }
        case actionTypes.resetFollowing: {
            return Object.assign({}, state, {
                following: initialState.following
            });
        }
        case actionTypes.addToFollowing: {
            return Object.assign({}, state, {
                following: action.following
            });
        }
        case actionTypes.setUsername: {
            return Object.assign({}, state, {
                username: action.username
            });
        }
        case actionTypes.setFollowStatus: {
            return Object.assign({}, state, {
                followStatus: action.status
            })
        }
        default: {
            return state;
        }
    }
}

export default profileReducer
