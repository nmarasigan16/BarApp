import { profileActionTypes as actionTypes} from './actionTypes';
import apiActions from './apiActions';

const API_ROOT = 'https://api.github.com'

function profileMatch(username, profile) {
    if(typeof profle != 'undefined' && 'login' in profile){
        if(profile.login === username) {
           return true;
        }
    }
    return false
}

export const fetchProfile = () => {
    return (dispatch, getState) => {
        const {
            fetchItem,
            fetchItemSuccess,
            fetchItemError
        } = apiActions;
        profileState = getState().profile
        const {
            username,
            profile
        } = profileState;

        if(!profileMatch(username, profile)){
            dispatch(fetchItem());
            return fetch(API_ROOT + '/users/' + username)
                    .then(
                        response => response.json())
                    .then(
                        json => {
                            dispatch(fetchItemSuccess());
                            dispatch(getProfile(json));
                        })
                    .catch(
                        error => {
                            dispatch(fetchItemError(error));
                        });
        } else {
            dispatch(getProfile(profile));
        }
    }
};

export const getProfile = (profile) => {
    return {
        type: actionTypes.getProfile,
        profile: profile
    };
};

export const fetchRepos = () => {
    return (dispatch, getState) => {
        const {
            fetchItem,
            fetchItemSuccess,
            fetchItemError
        } = apiActions;
        profileState = getState().profile;
        const { username } = profileState;

        dispatch(fetchItem());
        return fetch(API_ROOT + '/users/' + username + '/repos?type=all')
                .then(
                    response => response.json()
                )
                .then(
                    json => {
                        dispatch(fetchItemSuccess());
                        dispatch(getRepos(json));
                    }
                )
                .catch(
                    error => {
                        dispatch(fetchItemError(error));
                    }
                );

    };
};

export const getRepos = (repos) => {
    return {
        type: actionTypes.getRepos,
        repos: repos
    };
};


export default profileActions = Object.assign({}, {
    getProfile: getProfile,
    fetchProfile: fetchProfile,
    fetchRepos: fetchRepos,
    getRepos: getRepos,
});
