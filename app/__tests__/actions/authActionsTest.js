import 'react-native';
import React from 'react';
import * as actions from '../../src/actions/authActions';
import actionTypes from '../../src/actions/actionTypes';


describe('Pure action creators', () => {
    it('Extracts username from response', () => {
        const response = {
            login: 'cows'
        };
        const action = {
            type: actionTypes.setAuthUser,
            username: 'cows'
        };
        expect(actions.extractUsername(response)).toEqual()
    });

    it('authenticates a user', () => {
        const action = {
            type: actionTypes.authenticate,
            token: 'asdf'
        };
        expect(actions.authenticate('asdf')).toEqual(action);
    });
});
