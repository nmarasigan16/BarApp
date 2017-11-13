import 'react-native';
import React from 'react';
import Avatar from '../../../src/components/general/avatar/AvatarComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    const tree = renderer.create(
        <Avatar
            image={'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

describe('renders sizes', () => {
    it('renders small', () => {
        const tree = renderer.create(
            <Avatar
                image={'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'}
                size={'small'}/>
        ).toJSON();
    });

    it('renders medium', () => {
        const tree = renderer.create(
            <Avatar
                image={'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'}
                size={'medium'}/>
        ).toJSON();
    });

    it('renders large', () => {
        const tree = renderer.create(
            <Avatar
                image={'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'}
                size={'large'}/>
        ).toJSON();
    });

    it('renders xlarge', () => {
        const tree = renderer.create(
            <Avatar
                image={'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'}
                size={'xlarge'}/>
        ).toJSON();
    });

});