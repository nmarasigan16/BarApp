import { apiActionTypes as actionTypes } from './actionTypes';

export const fetchItem = (username) => {
    return ({
        type: actionTypes.fetchItem,
    });
};

export const fetchItemError = (error) => {
    return ({
        type: actionTypes.fetchItemFailure,
        error: error
    });
}

export const fetchItemSuccess = () => {
    return ({
        type: actionTypes.fetchItemSuccess,
    });
};

export default apiActionCreators = Object.assign({}, {
    fetchItem: fetchItem,
    fetchItemError: fetchItemError,
    fetchItemSuccess: fetchItemSuccess
});
