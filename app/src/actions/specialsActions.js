import { requests, API_ROOT } from "./apiActions";
import { specialsActionTypes as actionTypes } from "./actionTypes";

export const setSpecial = (response) => {
    return {
        type: actionTypes.setSpecialObject,
        special: response.special
    };
};

export const getSpecial = (barId, id) => (dispatch) => {
    const uri = `${API_ROOT}/specials`;
    const params = {
        barId,
        id,
    };
    dispatch(requests.makeGetRequest(uri, setSpecial))
};

export const onSpecial = () => {
    return {
        type: actionTypes.onSpecial
    };
};

export const offSpecial = () => {
    return {
        type: actionTypes.offSpecial
    }
};


export default specialsActions = Object.assign({}, {
    setSpecial,
    getSpecial,
    onSpecial,
    offSpecial,
});