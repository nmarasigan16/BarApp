export const profileActionTypes = {
    getProfile: 'GET_PROFILE',
    setStarredRepos: 'SET_STARRED_REPOS',
    setRepos: 'SET_REPOS',
    resetFollowers: 'RESET_FOLLOWERS',
    addToFollowers: 'ADD_TO_FOLLOWERS',
    follow: 'FOLLOW',
    resetFollowing: 'RESET_FOLLOWING',
    addToFollowing: 'ADD_TO_FOLLOWING',
    setUsername: 'SET_USERNAME',
    setFollowStatus: 'SET_FOLLOW_STATUS',
};

export const apiActionTypes = {
    fetchItem: 'FETCH_ITEM',
    fetchItemSuccess: 'FETCH_ITEM_SUCCESS',
    fetchItemFailure: 'FETCH_ITEM_FAILURE',
    resetError: 'RESET_ERROR',
};

export const authActionTypes = {
    authenticate: 'AUTHENTICATE',
    setAuthUser: 'SET_AUTH_USER',
    checkToken: 'CHECK_TOKEN',
    setToken: 'SET_TOKEN',
};

export const searchActionTypes = {
    updateHistory: 'UPDATE_HISTORY'
};

export default actionTypes = Object.assign({},
    profileActionTypes,
    apiActionTypes,
    authActionTypes
);
