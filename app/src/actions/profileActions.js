import { profileActionTypes as actionTypes} from './actionTypes';
import { makeGetRequest, makePutRequest, makeDeleteRequest ,checkStatus } from './apiActions';
import { storeItem } from '../lib/storage';

const API_ROOT = 'https://api.github.com';



/*
.______   .______        ______    _______  __   __       _______
|   _  \  |   _  \      /  __  \  |   ____||  | |  |     |   ____|
|  |_)  | |  |_)  |    |  |  |  | |  |__   |  | |  |     |  |__
|   ___/  |      /     |  |  |  | |   __|  |  | |  |     |   __|
|  |      |  |\  \----.|  `--'  | |  |     |  | |  `----.|  |____
| _|      | _| `._____| \______/  |__|     |__| |_______||_______|

 */
function profileMatch(username, profile) {
    if(typeof profile != 'undefined' && 'login' in profile){
        if(profile.login === username) {
           return true;
        }
    }
    return false
}

export const getProfile = (profile) => {
    storeItem('PROFILE_KEY', profile);
    return {
        type: actionTypes.getProfile,
        profile: profile
    };
};

export const fetchProfile = (callback=[]) => {
    return (dispatch, getState) => {
        const profileState = getState().profile;
        const {
            username,
            profile
        } = profileState;

        if(!profileMatch(username, profile)){
            const uri = API_ROOT + '/users/' + username;
            dispatch(makeGetRequest(uri, getProfile, callback))
        } else {
            dispatch(getProfile(profile));
        }
    }
};

export const setUsername = (username) => {
    return {
        type: actionTypes.setUsername,
        username: username
    }
};

export const changeUser = (newUser) => {
    return (dispatch) => {
        dispatch(setUsername(newUser));
        dispatch(update());
    }
};


/*
.______       _______ .______     ______        _______.
|   _  \     |   ____||   _  \   /  __  \      /       |
|  |_)  |    |  |__   |  |_)  | |  |  |  |    |   (----`
|      /     |   __|  |   ___/  |  |  |  |     \   \
|  |\  \----.|  |____ |  |      |  `--'  | .----)   |
| _| `._____||_______|| _|       \______/  |_______/
                                                        
 */

export const setRepos = (repos) => {
    storeItem('REPO_KEY', repos);
    return {
        type: actionTypes.setRepos,
        repos: repos
    }
};

export const setStarredRepos = (repos) => {
    return {
        type: actionTypes.setStarredRepos,
        repos: repos
    }
};

export const addToStarredRepos = (repo) => (response) => (dispatch, getState) => {
    if(response.status === 204) {
        let starredRepos = getState().profile.starredRepos;
        starredRepos.push(repo);
        dispatch(setStarredRepos(starredRepos));
    }
};

export function removeFromRepos(repos, repo) {
    const starredRepo = repos.find((starRepo) => {
            return starRepo.id === repo.id;
        });
    const index = repos.indexOf(starredRepo);
    repos.splice(index, 1);
    return repos;
};

export const removeFromStarredRepos = (repo) => (response) => (dispatch, getState) => {
    if(response.status === 204) {
        let starredRepos = getState().profile.starredRepos;
        starredRepos = removeFromRepos(starredRepos, repo);
        dispatch(setStarredRepos(starredRepos));
    }
};


export const fetchRepos = (callBack=[]) => {
    return (dispatch, getState) => {
        const profileState = getState().profile.profile;
        if(typeof profileState === 'undefined') {
            return;
        }
        const { repos_url } = profileState;
        const uri = repos_url;
        const params = {
            type: 'all'
        };
        dispatch(makeGetRequest(uri, setRepos, callBack, params));
        dispatch(fetchStarred());
    };
};

export const fetchStarred = (callBack=[]) => {
    return (dispatch, getState) => {
        const authUser = getState().auth.authUser;
        if(!authUser){
            return;
        }
        uri = API_ROOT + '/user/starred';
        dispatch(makeGetRequest(uri, setStarredRepos, callBack, params));
    }
};

export const starRepo = (repo) => (dispatch, getState) => {
    uri = API_ROOT + `/user/starred/${repo.owner.login}/${repo.name}`;
    dispatch(makePutRequest(uri, addToStarredRepos(repo)));
};

export const unstarRepo = (repo) => (dispatch, getState) => {
    uri = API_ROOT + `/user/starred/${repo.owner.login}/${repo.name}`;
    dispatch(makeDeleteRequest(uri, removeFromStarredRepos(repo)));
};

/*
 _______   ______    __       __        ______   ____    __    ____
|   ____| /  __  \  |  |     |  |      /  __  \  \   \  /  \  /   /
|  |__   |  |  |  | |  |     |  |     |  |  |  |  \   \/    \/   /
|   __|  |  |  |  | |  |     |  |     |  |  |  |   \            /
|  |     |  `--'  | |  `----.|  `----.|  `--'  |    \    /\    /
|__|      \______/  |_______||_______| \______/      \__/  \__/
 */

//Follower

export const resetFollowers = () => {
    return {
        type: actionTypes.resetFollowers,
    };
};

export const addToFollowers = (followers) => (dispatch, getState) => {
    let new_followers = getState().profile.followers.slice();
    new_followers.push(...followers);
    storeItem('FOLLOWER_KEY', new_followers);
    dispatch({
        type: actionTypes.addToFollowers,
        followers: new_followers,
    });
};

export const fetchFollowers = (callback=[]) => {
    return (dispatch, getState) => {
        const profileState = getState().profile.profile;
        if(typeof profileState === 'undefined'){
            return;
        }
        const { followers_url, followers } = profileState;

        let pages = followers/200;
        pages += pages%200 === 0 ? 0 : 1;

        dispatch(resetFollowers());

        for(let i = 1; i <= pages; i++){
            const uri = followers_url;
            const params = {
                page: i,
                per_page: 200
            };
            dispatch(makeGetRequest(uri, addToFollowers, callback, params));
        }
    }
};

// Following

export const resetFollowing = () => {
    return {
        type: actionTypes.resetFollowing,
    };
};

export const addToFollowing = (following) => (dispatch, getState) => {
    let new_following = getState().profile.following.slice();
    new_following.push(...following);
    storeItem('FOLLOWING_KEY', new_following);
    dispatch( {
        type: actionTypes.addToFollowing,
        following: new_following
    })
};

export const fetchFollowing = (callback=[]) => {
    return (dispatch, getState) => {
        const profileState = getState().profile.profile;
        if(typeof profileState === 'undefined'){
            return;
        }
        const { following_url, following } = profileState;

        let pages = following/200;
        pages += pages%200 === 0 ? 0 : 1;

        dispatch(resetFollowing());

        for(let i = 1; i <= pages; i++){
            const uri = following_url.slice(0, -13);
            const params = {
                page: i,
                per_page: 200,
            };
            dispatch(makeGetRequest(uri, addToFollowing, callback, params));
        }
    }
};

//Put and Delete

function getFollowStatus(response) {
    if('status' in response){
        switch(response.status){
            case 204: {
                return 1;
            }
            case 404: {
                return 0;
            }
        }
    }
    return 0;
}

export const setFollowStatus = (response, isMe=false) => {
    if(isMe){
        return {
            type: actionTypes.setFollowStatus,
            status: -1
        }
    }
    let status = getFollowStatus(response);
    return {
        type: actionTypes.setFollowStatus,
        status: status
    };
};

export const updateFollowStatus = (code) => (response) => {
    if(getFollowStatus(response)){
        return {
            type: actionTypes.setFollowStatus,
            status: code
        }
    }
    return {
        type: actionTypes.setFollowStatus,
        status: 0
    };
};

export const follow = () => (dispatch, getState) => {
    const profileState = getState().profile.profile;
    const username = profileState.login;
    uri = API_ROOT + `/user/following/${username}`;
    dispatch(makePutRequest(uri, updateFollowStatus(1)));
};

export const unfollow = () => (dispatch, getState) => {
    const profileState = getState().profile.profile;
    const username = profileState.login;
    uri = API_ROOT + `/user/following/${username}`;
    dispatch(makeDeleteRequest(uri, updateFollowStatus(0)));
};

export const checkFollowStatus = () => (dispatch, getState) => {
    const state = getState();
    const authUser = state.auth.authUser;
    const currUser = state.profile.profile.login;

    if(authUser === currUser){
        dispatch(setFollowStatus('', true));
    }
    else{
        uri = API_ROOT + `/user/following/${currUser}`;
        dispatch(checkStatus(uri, setFollowStatus))
    }

};

/*
INIT
 */


export const update = () => {
    return (dispatch) => {
        dispatch(fetchProfile([fetchRepos, fetchFollowers, fetchFollowing, checkFollowStatus]))
    };
};

export default profileActions = Object.assign({}, {
    changeUser: changeUser,
    follow: follow,
    unfollow: unfollow,
});
