import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import NavigationBar from '../../../src/components/NavigationBar/NavigationBarComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const nav = {
        navigate: jest.fn(),
    };
    const tree = renderer.create(
        <NavigationBar nav={nav}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('opens the drawer', () => {
    const nav = {
        navigate: jest.fn(),
    };
    const wrapper = shallow(<NavigationBar nav={nav} />);
    const render = wrapper.dive();
    render.find('TouchableOpacity').first().props().onPress();

    expect(nav.navigate).lastCalledWith('DrawerOpen');
});