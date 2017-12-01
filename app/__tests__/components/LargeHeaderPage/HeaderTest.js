import 'react-native';
import React from 'react';
import Header from '../../../src/components/LargeHeaderPage/header/HeaderComponent';
import AdditionalInfo from '../../../src/components/LargeHeaderPage/header/AdditionalInfoComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <Header
            name={'Legends'}
            location={{
                string_repr: '522 E Green St, Champaign, IL 61820',
                latitude: 40.1105053,
                longitude: -88.2311641,
            }}
            telephone={'2173557674'}
        >
        </Header>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders without location or telephone', () => {
    const tree = renderer.create(
        <Header
            name={'Legends'}
        >
        </Header>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders with shortcode telephone', () => {
    const tree = renderer.create(
        <Header
            name={'Legends'}
            telephone={'3557674'}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot()
});

it('renders without location', () => {
    const tree = renderer.create(
        <Header
            name={'Legends'}
            telephone={'2173557674'}
        >
        </Header>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders without phone number', () => {
    const tree = renderer.create(
        <Header
            name={'Legends'}
            location={{
                string_repr: '522 E Green St, Champaign, IL 61820',
                latitude: 40.1105053,
                longitude: -88.2311641,
            }}
        >
        </Header>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
