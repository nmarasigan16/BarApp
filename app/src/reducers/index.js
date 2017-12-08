import { combineReducers } from 'redux';
import api from './apiReducer';
import auth from './authReducer';
import bar from './barReducer';
import specials from './specialsReducer';

export default combineReducers({
    api,
    auth,
    bar,
    specials,
});
