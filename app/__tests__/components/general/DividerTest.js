import 'react-native';
import React from 'react';
import Divider from '../../../src/components/general/divider/DividerComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <Divider />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
