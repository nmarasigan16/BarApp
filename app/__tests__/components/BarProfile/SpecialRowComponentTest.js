import 'react-native';
import React from 'react';
import SpecialRowComponent from '../../../src/components/BarProfile/SpecialRowComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly with an object', () => {
    const special = {
        description: 'Hello there',
        object: {
            name: 'Rail Card'
        }
    };
    const tree = renderer.create(
        <SpecialRowComponent special={special}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders correctly without an object', () => {
    const special = {
        description: 'Hello there',
    };
    const tree = renderer.create(
        <SpecialRowComponent special={special}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
