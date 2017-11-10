import { combineReducers } from 'redux';
import profile from './profileReducer';
import api from './apiReducer';
import auth from './authReducer';

export default combineReducers({
    api,
    auth
});
