import 'react-native';
import React from 'react';
import * as actions from '../../src/actions/apiActions';
import actionTypes from '../../src/actions/actionTypes';
import configureMockStore from 'redux-mock-store';
import {makeUrl} from "../../src/actions/apiActions";
import {fetchItemError} from "../../src/actions/apiActions";
import {fetchItem} from "../../src/actions/apiActions";
import {fetchItemSuccess} from "../../src/actions/apiActions";



describe('Pure action creators', () => {
    it('should make a correct url with params', () => {
        const expectedUrl = 'https://moo.com/cow?color=brown&gender=male';
        const params = {
            color: 'brown',
            gender: 'male',
        };
        uri = 'https://moo.com/cow';
        expect(makeUrl(uri, params)).toEqual(expectedUrl);
    });

    it('should dispatch a fetch item', () => {
        const action = {
            type: actionTypes.fetchItem
        };
        expect(fetchItem()).toEqual(action);
    });

    it('should dispatch an error', () => {
        const action = {
            type: actionTypes.fetchItemFailure,
            error: 'oh no'
        };
        expect(fetchItemError('oh no')).toEqual(action);
    });

    it('should stop fetching without an error', () => {
        const action = {
            type: actionTypes.fetchItemSuccess
        };
        expect(fetchItemSuccess()).toEqual(action);
    });
});

