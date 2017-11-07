import 'react-native';
import React from 'react';
import * as actions from '../../src/actions/profileActions';
import actionTypes from '../../src/actions/actionTypes';
import mockState from '../../__mocks__/mockState';
import * as storage from '../../src/lib/storage';
import {setUsername} from "../../src/actions/profileActions";
import configureMockStore from 'redux-mock-store';
import {setStarredRepos} from "../../src/actions/profileActions";

const mockStore = configureMockStore([]);


describe('profile', () => {
    it('gets and stores profile', () => {

        storage.storeItem = jest.fn();
        const action = {
            type: actionTypes.getProfile,
            profile: mockState.profile
        };
        expect(actions.getProfile(mockState.profile)).toEqual(action);
        expect(storage.storeItem).toBeCalled();
    });

    it('sets usernames', () => {
        const action = {
            type: actionTypes.setUsername,
            username: 'cows'
        };
        expect(actions.setUsername('cows')).toEqual(action);
    });
}

describe('repos', () => {
    it('sets repos', () => {
        const action = {
            type: actionTypes.setRepos,
            repos: mockState.repos
        };
        expect(actions.setRepos(mockState.repos)).toEqual(action);
    });

    it('sets starred repos', () => {
        const action = {
            type: actionTypes.setStarredRepos,
            repos: mockState.repos
        };
        expect(actions.setStarredRepos(mockState.repos)).toEqual(action);
    });

    it('removes the correct repo', () => {
        const repos = [{id: 5}, {id: 10}, {id: 20}];
        const expected_repos = [{id: 5}, {id: 20}];
        const repo = {id: 10};
        expect(actions.removeFromRepos(repos, repo)).toEqual(expected_repos);
    });
}

describe('follow', () => {
    it('resets the following', () => {
        const action = {
            type: actionTypes.resetFollowing
        };
        expect(actions.resetFollowing()).toEqual(action);
    });

    it('resets the followers', () => {
        const action = {
            type:actionTypes.resetFollowing
        }
    });

});
