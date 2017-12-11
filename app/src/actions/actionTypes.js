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
    registered: 'REGISTERED',
};

export const barActionTypes = {
    setBar: 'SET_BAR',
    updateSpecial: 'UPDATE_SPECIAL',
    createSpecial: 'CREATE_SPECIAL',
    updateCover: 'UPDATE_COVER',
};

export const specialsActionTypes = {
    onSpecial: 'ON_SPECIAL',
    offSpecial: 'OFF_SPECIAL',
    setSpecialObject: 'SET_SPECIAL_OBJECT',
    updateSpecialObject: 'UPDATE_SPECIAL_OBJECT',
    getSpecialObject: 'GET_SPECIAL_OBJECT',
    createSpecialObject: 'CREATE_SPECIAL_OBJECT',
    checkSpecialObject: 'CHECK_SPECIAL_OBJECT',
    getSpecialList: 'GET_SPECIAL_LIST',
};

export default actionTypes = Object.assign({},
    profileActionTypes,
    apiActionTypes,
    authActionTypes,
    barActionTypes,
    specialsActionTypes,
);
