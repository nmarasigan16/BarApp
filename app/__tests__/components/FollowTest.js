import 'react-native';
import React from 'react';
import FollowerRow from '../../src/components/follow/FollowRow';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <FollowerRow />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});