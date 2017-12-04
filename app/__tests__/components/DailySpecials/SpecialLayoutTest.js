import 'react-native';
import React from 'react';
import SpecialLayout from '../../../src/components/DailySpecials/SpecialLayout';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const tempSpecials = [
    {
        barName: 'Legends',
        description: '$3 for any draft',
        barId: 5
    },
    {
        barName: 'Brothers',
        description: '$1 wells',
        barId: 4
    }
];

it('renders correctly with specials', () => {
    const tree = renderer.create(
        <SpecialLayout specials={tempSpecials}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('render correctly without specials', () => {
    const tree = renderer.create(
        <SpecialLayout/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
