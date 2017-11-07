export const profileActionTypes = {
    getProfile: 'GET_PROFILE',
    getRepos: 'GET_REPOS',
};

export const apiActionTypes = {
    fetchItem: 'FETCH_ITEM',
    fetchItemSuccess: 'FETCH_ITEM_SUCCESS',
    fetchItemFailure: 'FETCH_ITEM_FAILURE'
};

export default actionTypes = Object.assign({},
    profileActionTypes,
    apiActionTypes
);
