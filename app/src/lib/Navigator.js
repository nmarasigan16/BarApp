import React, { Component } from 'react';
import Profile from '../containers/profile/ProfileContainer';
import Repo from '../containers/repos/RepoContainer';
import Followers from '../containers/follow/FollowersContainer';
import Following from '../containers/follow/FollowingContainer';
import { TabNavigator } from 'react-navigation';

const Navigator = TabNavigator({
    Profile: {
        screen: Profile,
    },
    Repo: {
        screen: Repo,
    },
    Followers: {
        screen: Followers
    },
    Following: {
        screen: Following,
    },
},
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: 'blue',
        },
});

export default Navigator;
