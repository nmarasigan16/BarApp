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


export default specialsActions = Object.assign({}, {
    setSpecial,
    getSpecial
});