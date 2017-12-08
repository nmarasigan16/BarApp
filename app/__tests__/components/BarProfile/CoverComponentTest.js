import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import CoverComponent from '../../../src/components/BarProfile/CoverComponent';
import * as prompt from 'react-native-prompt-android';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <CoverComponent cover={10}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('prompts on press', () => {
    prompt.default = jest.fn();

    const wrapper = shallow(
        <CoverComponent cover={10}/>
    );
    const render = wrapper.dive();
    render.find('TouchableOpacity').first().props().onPress();

    expect(prompt.default).toHaveBeenCalled();
});
