import 'react-native';
import React from 'react';
import Avatar from '../../src/components/general/avatar/AvatarComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <Avatar />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});