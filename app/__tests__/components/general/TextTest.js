import 'react-native';
import React from 'react';
import Text from '../../../src/components/general/text/TextComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <Text />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});