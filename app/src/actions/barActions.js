import { barActionTypes as actionTypes } from "./actionTypes";
import { requests, API_ROOT } from "./apiActions";

export const setBar = (response) => {
    return {
        type: actionTypes.setBar,
        bar: response.bar,
    }
};

export const getBar = (id) => (dispatch) => {
    const url = `${API_ROOT}/bars`;
    dispatch(requests.makeGetRequest(url, setBar, undefined, {id}));
};

export default barActions = {
    getBar,
    setBar,
}