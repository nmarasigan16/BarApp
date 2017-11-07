import 'react-native';
import React from 'react';
import Repo from '../../src/components/repos/RepoRowComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import mockState from "../../__mocks__/mockState";

jest.mock('../../src/containers/repos/RepoStar', () => 'RepoStar');
it('renders correctly', () => {
    const tree = renderer.create(
        <Repo
            repo={mockState.repos[0]}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});