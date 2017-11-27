import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import * as comms from 'react-native-communications';
import * as maps from 'react-native-open-maps';
import AdditionalInfo from '../../../src/components/LargeHeaderPage/header/AdditionalInfoComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('calls the maps function', () => {
    comms.phonecall = jest.fn();
    maps.default = jest.fn();

    const wrapper = shallow(
        <AdditionalInfo
            location={{
                string_repr: '522 E Green St, Champaign, IL 61820',
                    latitude: 40.1105053,
                    longitude: -88.2311641,
            }}
            telephone={'2173557674'}
        />
    );
    const render = wrapper.dive();
    const buttons = render.find('TouchableOpacity');

    expect(buttons.length).toEqual(2);

    buttons.get(0).props.onPress();

    expect(maps.default).toHaveBeenCalled();

    buttons.get(1).props.onPress();

    expect(comms.phonecall).toHaveBeenCalled();
});

