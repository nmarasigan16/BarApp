import 'react-native';
import React from 'react';
import mockState from '../../__mocks__/mockState';
import Bio from '../../src/components/profile/bio/BioComponent';
import Followers from '../../src/components/profile/followers/FollowersComponent';
import Number from '../../src/components/profile/number/NumberComponent';
import Repos from '../../src/components/profile/repos/RepoComponent';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('renders correctly', () => {
    it('bio with all items', () => {
        const tree = renderer.create(
            <Bio
                bio={mockState.profile.bio}
                website={mockState.profile.website}
                email={mockState.profile.email}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('bio without website', () => {
        const tree = renderer.create(
            <Bio
                bio={mockState.profile.bio}
                website={''}
                email={mockState.profile.email}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('bio without bio', () => {
        const tree = renderer.create(
            <Bio
                bio={''}
                website={mockState.profile.website}
                email={mockState.profile.email}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('followers', () => {
        const tree = renderer.create(
            <Followers
                follow={mockState.profile.followers}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('number', () => {
        const tree = renderer.create(
            <Number
                label={"Percentage"}
                number={1000}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('repos', () => {
        const tree = renderer.create(
            <Repos
                repos={mockState.profile.public_repos}/>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
