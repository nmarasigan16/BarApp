import { combineReducers } from 'redux';
import profile from './profileReducer';
import api from './apiReducer';

export default combineReducers({
    profile,
    api
});
