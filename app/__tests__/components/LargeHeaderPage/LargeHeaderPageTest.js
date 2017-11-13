import 'react-native';
import React from 'react';
import Page from '../../../src/components/LargeHeaderPage/PageComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <Page
                name={'Legends'}
                location={{
                    string_repr: '522 E Green St, Champaign, IL 61820',
                    latitude: 40.1105053,
                    longitude: -88.2311641,
                }}
                telephone={'2173557674'}
                >
        </Page>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

