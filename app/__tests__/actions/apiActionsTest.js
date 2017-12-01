import 'react-native';
import React from 'react';
import thunk from 'redux-thunk';
import actionTypes from '../../src/actions/actionTypes';
import configureMockStore from 'redux-mock-store';
import actions from '../../src/actions/apiActions';
import { apiActionTypes } from "../../src/actions/actionTypes";
import * as urls from "../../src/lib/url/urlTools";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

urls.makeUrl = jest.fn(() => {
    return 'wow what a url';
});
urls.formatHeader = jest.fn(() => {
    return {};
});

describe('Pure action creators', () => {
    it('should dispatch a fetch item', () => {
        const action = {
            type: actionTypes.fetchItem
        };
        expect(actions.fetchItem()).toEqual(action);
    });

    it('should dispatch an error', () => {
        const action = {
            type: actionTypes.fetchItemFailure,
            error: 'oh no'
        };
        expect(actions.fetchItemError('oh no')).toEqual(action);
    });

    it('should stop fetching without an error', () => {
        const action = {
            type: actionTypes.fetchItemSuccess
        };
        expect(actions.fetchItemSuccess()).toEqual(action);
    });
});

describe('Request making', () => {
    const dataCallback = jest.fn((json) => {
        return {
            type: 'FILLERDATA',
            token: json
        };
    });
    const successCallback = jest.fn(() => {
        return {
            type: 'FILLERSUCCESS'
        }
    });

    describe('success', () => {
        let store = null;
        const expectedActionsSuccessCallback = [
                { type: apiActionTypes.fetchItem},
                { type: apiActionTypes.fetchItemSuccess},
                { type: 'FILLERDATA', token: 'hellothisisatoken'},
                { type: 'FILLERSUCCESS' }
        ];

        const expectedActions = [
            { type: apiActionTypes.fetchItem},
            { type: apiActionTypes.fetchItemSuccess},
            { type: 'FILLERDATA', token: 'hellothisisatoken'},
        ];

        beforeEach(() => {
            store = mockStore({auth: {header : ''}});
        });

        it('makes a get request without a success callback', () => {
            const expectedResponse = JSON.stringify({token: 'hellothisisatoken'});
            fetch.mockResponseOnce(expectedResponse);
            store.dispatch(actions.makeGetRequest('hellourl', dataCallback)).then(
                () => {
                    expect(store.getActions).toEqual(expectedActionsSuccessCallback);
                }
            );
        });

        it('makes a get request with success callback', () => {
            const expectedResponse = JSON.stringify({token: 'hellothisisatoken'});
            fetch.mockResponseOnce(expectedResponse);
            store.dispatch(actions.makeGetRequest('hellourl', dataCallback, [successCallback])).then(
                () => {
                    expect(store.getActions).toEqual(expectedActionsSuccessCallback);
                }
            );
        });

        it('makes a post request without a success callback', () => {
            const expectedResponse = JSON.stringify({token: 'hellothisisatoken'});
            fetch.mockResponseOnce(expectedResponse);
            store.dispatch(actions.makePostRequest('hellourl', dataCallback)).then(
                () => {
                    expect(store.getActions).toEqual(expectedActionsSuccessCallback);
                }
            );
        });

        it('makes a post request with success callback', () => {
            const expectedResponse = JSON.stringify({token: 'hellothisisatoken'});
            fetch.mockResponseOnce(expectedResponse);
            store.dispatch(actions.makePostRequest('hellourl', dataCallback, [successCallback])).then(
                () => {
                    expect(store.getActions).toEqual(expectedActionsSuccessCallback);
                }
            );
        });

        it('makes a put request without a success callback', () => {
            const expectedResponse = JSON.stringify({token: 'hellothisisatoken'});
            fetch.mockResponseOnce(expectedResponse);
            store.dispatch(actions.makePutRequest('hellourl', dataCallback)).then(
                () => {
                    expect(store.getActions).toEqual(expectedActionsSuccessCallback);
                }
            );
        });

        it('makes a put request with success callback', () => {
            const expectedResponse = JSON.stringify({token: 'hellothisisatoken'});
            fetch.mockResponseOnce(expectedResponse);
            store.dispatch(actions.makePutRequest('hellourl', dataCallback, [successCallback])).then(
                () => {
                    expect(store.getActions).toEqual(expectedActionsSuccessCallback);
                }
            );
        });

        it('makes a delete request without a success callback', () => {
            const expectedResponse = JSON.stringify({token: 'hellothisisatoken'});
            fetch.mockResponseOnce(expectedResponse);
            store.dispatch(actions.makeDeleteRequest('hellourl', dataCallback)).then(
                () => {
                    expect(store.getActions).toEqual(expectedActionsSuccessCallback);
                }
            );
        });

        it('makes a delete request with success callback', () => {
            const expectedResponse = JSON.stringify({token: 'hellothisisatoken'});
            fetch.mockResponseOnce(expectedResponse);
            store.dispatch(actions.makeDeleteRequest('hellourl', dataCallback, [successCallback])).then(
                () => {
                    expect(store.getActions).toEqual(expectedActionsSuccessCallback);
                }
            );
        })
    })

    describe('failure', () => {
        const expectedActions = [
            {type: apiActionTypes.fetchItem},
            {type: apiActionTypes.fetchItemFailure, error: expect.anything()}
        ];

        beforeEach(() => {
            store = mockStore({auth: {header: ''}});
        });

        it('makes a get request', () => {
            const error = JSON.stringify({error: 'error'});
            fetch.mockRejectOnce(error);
            store.dispatch(actions.makeGetRequest('hellourl')).then(
                () => {
                    expect(store.getActions).toEqual(expectedActions);
                }
            );
        });
        it('makes a post request', () => {
            const error = JSON.stringify({error: 'error'});
            fetch.mockRejectOnce(error);
            store.dispatch(actions.makePostRequest('hellourl')).then(
                () => {
                    expect(store.getActions).toEqual(expectedActions);
                }
            );
        });

        it('makes a put request', () => {
            const error = JSON.stringify({error: 'error'});
            fetch.mockRejectOnce(error);
            store.dispatch(actions.makePutRequest('hellourl')).then(
                () => {
                    expect(store.getActions).toEqual(expectedActions);
                }
            );
        });

        it('makes a delete request', () => {
            const error = JSON.stringify({error: 'error'});
            fetch.mockRejectOnce(error);
            store.dispatch(actions.makeDeleteRequest('hellourl')).then(
                () => {
                    expect(store.getActions).toEqual(expectedActions);
                }
            );
        });

    })

});

