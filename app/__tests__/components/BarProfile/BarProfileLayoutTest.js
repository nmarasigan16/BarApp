import 'react-native';
import React from 'react';
import BarProfileLayout from '../../../src/components/BarProfile/BarProfileLayout';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <BarProfileLayout/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
