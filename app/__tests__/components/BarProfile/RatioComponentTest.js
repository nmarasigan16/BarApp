import 'react-native';
import React from 'react';
import RatioComponent from '../../../src/components/BarProfile/RatioComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <RatioComponent guys={10}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
