import 'react-native';
import React from 'react';
import * as actions from '../../src/actions/apiActions';
import actionTypes from '../../src/actions/actionTypes';
import configureMockStore from 'redux-mock-store';
import {fetchItemError} from "../../src/actions/apiActions";
import {fetchItem} from "../../src/actions/apiActions";
import {fetchItemSuccess} from "../../src/actions/apiActions";
import * as urls from "../../src/lib/url/urlTools";
import {makeGetRequest} from "../../src/actions/apiActions";


const mockStore = configureMockStore();

describe('Pure action creators', () => {
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

describe('Request making', () => {
    beforeEach(() => {
        urls.makeUrl = jest.fn(() => {
            return 'wow what a url';
        });
        urls.formatHeader = jest.fn(() => {
            return {};
        });
    });

    it('makes a get request', () => {
        const expectedResponse = JSON.stringify({token: 'hellothisisatoken'});
        fetch.mockResponseOnce(expectedResponse);
        const dataCallback = jest.fn(() => {
            return {
                type: 'filler'
            }
        });
        const successCallback = jest.fn(() => {
            return {
                type: 'filler'
            }
        });
        const store = mockStore({});
        store.dispatch(makeGetRequest('wow what a', dataCallback, [successCallback]));
        expect(dataCallback).toBeCalledWith(JSON.parse(expectedResponse));
    });

});

